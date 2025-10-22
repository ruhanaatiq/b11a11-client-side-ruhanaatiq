// src/pages/Deals.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api"; // baseURL must end with /api

export default function Deals() {
  const nav = useNavigate();
  const { search } = useLocation();

  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(true);

  // search form state
  const [form, setForm] = useState({
    pickup: "",
    dropoff: "",
    from: "",
    to: "",
    promo: "",
  });

  // results state
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ days: 0, promoApplied: 0 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // normalize options from API (string OR {code,name})
  const toOption = (b) =>
    typeof b === "string" ? { value: b, label: b } : { value: b.name, label: b.name };

  // prefill form if query params exist (so /deals?pickup=... works)
  const qs = useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);

  useEffect(() => {
    // load locations
    api
      .get("/locations")
      .then(({ data }) => setBranches(data?.branches ?? []))
      .catch(() => setBranches(["Dhaka Airport", "Chattogram", "Sylhet"]))
      .finally(() => setLoadingBranches(false));
  }, []);

  // if URL has params, prefill and auto-search
  useEffect(() => {
    if (Object.keys(qs).length) {
      setForm((f) => ({ ...f, ...qs }));
      doSearch({ ...form, ...qs }, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs]);

  const nowLocal = new Date().toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm

  function validate(payload) {
    if (!payload.from || !payload.to) return "Please pick both date & time.";
    if (new Date(payload.to) <= new Date(payload.from))
      return "Drop-off must be after pick-up.";
    return "";
  }

  async function doSearch(payload, pushUrl = true) {
    const msg = validate(payload);
    if (msg) {
      setErr(msg);
      setItems([]);
      return;
    }

    // default: dropoff same as pickup if empty
    const params = { ...payload, dropoff: payload.dropoff || payload.pickup };

    setLoading(true);
    setErr("");
    try {
      const { data } = await api.get("/search", { params });
      setItems(data?.items ?? []);
      setMeta({ days: data?.days ?? 0, promoApplied: data?.promoApplied ?? 0 });

      // keep URL in sync (nice to bookmark/share)
      if (pushUrl) {
        const u = new URLSearchParams(params).toString();
        nav(`/deals?${u}`, { replace: true });
      }
    } catch (e) {
      setErr(e.response?.data?.error || "Search failed");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    doSearch(form, true);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Affordable Car Rental Deals</h1>

      {/* Search form */}
      <form onSubmit={submit} className="grid md:grid-cols-5 gap-3 mb-4">
        <select
          className="select select-bordered"
          value={form.pickup}
          onChange={(e) => setForm((f) => ({ ...f, pickup: e.target.value }))}
          disabled={loadingBranches}
          required
        >
          <option value="">Pick-up location</option>
          {branches.map((b, i) => {
            const o = toOption(b);
            return (
              <option key={`p-${i}`} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>

        <select
          className="select select-bordered"
          value={form.dropoff}
          onChange={(e) => setForm((f) => ({ ...f, dropoff: e.target.value }))}
          disabled={loadingBranches}
        >
          <option value="">Drop-off location (same as pick-up)</option>
          {branches.map((b, i) => {
            const o = toOption(b);
            return (
              <option key={`d-${i}`} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>

        <input
          type="datetime-local"
          className="input input-bordered"
          min={nowLocal}
          value={form.from}
          onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
          required
        />
        <input
          type="datetime-local"
          className="input input-bordered"
          min={form.from || nowLocal}
          value={form.to}
          onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))}
          required
        />

        <div className="flex gap-2">
          <input
            placeholder="Promo code"
            className="input input-bordered flex-1"
            value={form.promo}
            onChange={(e) => setForm((f) => ({ ...f, promo: e.target.value }))}
          />
          <button className="btn btn-primary">Find my car</button>
        </div>
      </form>

      {/* Search summary / errors */}
      {(form.from && form.to) && (
        <p className="text-sm mb-4">
          {form.pickup || "Any"} → {form.dropoff || form.pickup || "Same"} |{" "}
          {form.from} → {form.to} | Promo: {form.promo || "none"}
          {meta.days ? ` | ${meta.days} day(s)` : ""}
          {meta.promoApplied ? ` | -${meta.promoApplied}%` : ""}
        </p>
      )}
      {err && <div className="text-red-500 mb-4">{err}</div>}
      {loading && <div className="mb-4">Loading…</div>}

      {/* Results */}
      <h2 className="text-2xl font-semibold mb-3">Available cars</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading && !err && items.length === 0 && (
          <div className="text-sm text-gray-500">No cars match your filters.</div>
        )}

        {items.map((c) => (
          <div key={c._id} className="card bg-base-100 shadow">
            <figure>
              <img
                src={c.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={c.model}
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{c.model}</h3>
              <p className="text-sm">{c.branch}</p>
              <p className="text-sm">Base: ${c.priceBeforeDeals}</p>
              <p className="text-lg font-bold">Total: ${c.finalPrice} / {meta.days} day(s)</p>
              <button className="btn btn-sm btn-warning" onClick={() => nav(`/cars/${c._id}`)}>
                View & Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
