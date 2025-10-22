import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../provider/AuthProvider";

export default function Dashboard() {
  const { user } = useContext(AuthContext); // <-- comes from your provider
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;  // PrivateRoute already guards this
    setLoading(true);
    setError("");
    api
      .get("/bookings", { params: { email: user.email } }) // backend checks JWT + email
      .then(({ data }) => setBookings(Array.isArray(data) ? data : []))
      .catch((e) =>
        setError(
          e.response?.data?.error ||
          e.response?.data?.message ||
          e.message ||
          "Failed to load"
        )
      )
      .finally(() => setLoading(false));
  }, [user?.email]);

  const now = new Date();
  const { upcoming, past, totals } = useMemo(() => {
    const up = [], pa = [];
    let spent = 0;
    for (const b of bookings) {
      const end = new Date(b.endDate);
      (end >= now ? up : pa).push(b);
      if (b.bookingStatus === "confirmed" || end < now) {
        spent += Number(b.totalPrice || 0);
      }
    }
    up.sort((a, z) => new Date(a.startDate) - new Date(z.startDate));
    pa.sort((a, z) => new Date(z.startDate) - new Date(a.startDate));
    const last = bookings.slice().sort((a, z) =>
      new Date(z.createdAt) - new Date(a.createdAt)
    )[0];
    return { upcoming: up, past: pa, totals: { count: bookings.length, upcoming: up.length, spent, last } };
  }, [bookings]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </header>

      {/* Summary cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Total bookings" value={totals.count} />
        <Stat label="Upcoming" value={totals.upcoming} />
        <Stat label="Total spent" value={`$${totals.spent}`} />
        <Stat label="Last booking" value={totals.last ? new Date(totals.last.createdAt).toLocaleDateString() : "—"} />
      </section>

      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading && <span className="loading loading-dots loading-lg text-orange-500 block mb-6" />}

      <h2 className="text-2xl font-semibold mb-3">Upcoming bookings</h2>
      {!loading && upcoming.length === 0 ? (
        <Empty text="No upcoming bookings yet." onClick={() => nav("/available-cars")} />
      ) : (
        <BookingGrid items={upcoming} />
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-3">Recent bookings</h2>
      {!loading && past.length === 0 ? (
        <Empty text="No past bookings." />
      ) : (
        <BookingGrid items={past.slice(0, 6)} />
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Empty({ text, onClick }) {
  return (
    <div className="p-6 rounded border border-dashed text-sm text-gray-500 flex items-center justify-between">
      <span>{text}</span>
      {onClick && <button className="btn btn-primary btn-sm" onClick={onClick}>Browse cars</button>}
    </div>
  );
}

function BookingGrid({ items }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((b) => (
        <div key={b._id} className="card bg-base-100 shadow">
          <figure className="h-40 overflow-hidden">
            <img
              src={b.carImage || "https://via.placeholder.com/400x300?text=No+Image"}
              alt={b.carModel}
              className="h-full w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h3 className="card-title">{b.carModel}</h3>
            <p className="text-sm">
              {new Date(b.startDate).toLocaleString()} → {new Date(b.endDate).toLocaleString()}
            </p>
            <p className="text-sm">Status: <span className="font-medium">{b.bookingStatus}</span></p>
            <p className="text-lg font-semibold">${b.totalPrice}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
