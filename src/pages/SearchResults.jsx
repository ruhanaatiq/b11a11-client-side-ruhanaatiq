// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

function useQS() {
  const { search } = useLocation();
  return Object.fromEntries(new URLSearchParams(search));
}

export default function SearchResults() {
  const axiosSecure = useAxiosSecure();
  const nav = useNavigate();
  const qs = useQS();

  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ days: 0, promoApplied: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure.get("/search", { params: qs })
      .then(({ data }) => {
        setItems(data.items || []);
        setMeta({ days: data.days, promoApplied: data.promoApplied });
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, qs.pickup, qs.dropoff, qs.from, qs.to, qs.promo]);

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Available cars</h1>
      <p className="mb-4 text-sm">
        {qs.pickup || "Any"} → {qs.dropoff || qs.pickup || "Same location"} | {qs.from} → {qs.to} | Promo: {qs.promo || "none"}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(c => (
          <div key={c._id} className="card bg-base-100 shadow">
            <figure><img src={c.images?.[0]} alt={c.model} className="h-40 w-full object-cover"/></figure>
            <div className="card-body">
              <h3 className="card-title">{c.model}</h3>
              <p>{c.branch}</p>
              <p className="text-sm">Base: ${c.priceBeforeDeals}</p>
              <p className="text-lg font-bold">Total: ${c.finalPrice} / {meta.days} day(s)</p>
              <button className="btn btn-sm btn-warning" onClick={() => nav(`/cars/${c._id}`)}>Book</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div>No cars match your filters.</div>}
      </div>
    </div>
  );
}
