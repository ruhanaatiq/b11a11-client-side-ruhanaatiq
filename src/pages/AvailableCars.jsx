// src/pages/AvailableCars.jsx (or where you keep it)
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const placeholder =
  "https://images.unsplash.com/photo-1549921296-3fd62c953cf5?q=80&w=1400&auto=format&fit=crop";

/* ---------------------------
   Small helpers
---------------------------- */
const fmtMoney = (n) =>
  typeof n === "number" ? n.toLocaleString(undefined, { minimumFractionDigits: 0 }) : "—";

const daysBetween = (a, b) => {
  const A = new Date(a);
  const B = new Date(b);
  const ms = B.setHours(12, 0, 0, 0) - A.setHours(12, 0, 0, 0);
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

const isNewSince = (dateStr, days = 7) => {
  const d = new Date(dateStr || Date.now());
  const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff <= days;
};

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [sortOption, setSortOption] = useState("newest");
  const [search, setSearch] = useState("");
  const [q, setQ] = useState(""); // debounced
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const todayStr = new Date().toISOString().split("T")[0];

  /* Fetch */
  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .get("/cars")
      .then((res) => {
        if (!alive) return;
        setCars(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load cars:", err);
        if (!alive) return;
        setError("Failed to load cars. Please try again later.");
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  /* Debounce search */
  useEffect(() => {
    const t = setTimeout(() => setQ(search.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [search]);

  /* Filter & sort */
  const list = useMemo(() => {
    const onlyAvailable = cars.filter((c) => c.availability !== false);
    const filtered = onlyAvailable.filter((c) =>
      `${c.model || ""} ${c.location || ""}`.toLowerCase().includes(q)
    );
    const sorted = filtered.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
        case "oldest":
          return new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0);
        case "lowestPrice":
          return (a.dailyPrice || 0) - (b.dailyPrice || 0);
        case "highestPrice":
          return (b.dailyPrice || 0) - (a.dailyPrice || 0);
        default:
          return 0;
      }
    });
    return sorted;
  }, [cars, q, sortOption]);

  /* Modal controls */
  const closeModal = () => {
    setSelectedCar(null);
    setBookingDates({ startDate: "", endDate: "" });
    setSubmitting(false);
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("You must be logged in to book a car.");
      return;
    }

    const { startDate, endDate } = bookingDates;
    if (!startDate || !endDate) return toast.error("Please select both start and end dates.");
    if (new Date(endDate) < new Date(startDate)) return toast.error("End date cannot be before start date.");

    const nights = daysBetween(startDate, endDate);
    if (nights <= 0) return toast.error("Booking must be at least one full day.");

    try {
      setSubmitting(true);
      await api.post("/bookings", {
        carId: selectedCar._id,
        startDate,
        endDate,
      });
      toast.success("Booking successful!");
      closeModal();
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      if (err.response?.status === 403) {
        toast.error("Session expired. Redirecting to login.");
        localStorage.removeItem("access-token");
        navigate("/login");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* Skeletons */
  const skeletons = new Array(9).fill(0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Available Cars</h2>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <label className="font-medium">Search:</label>
          <input
            type="text"
            placeholder="Search by model or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-60"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="font-medium">Sort by:</label>
          <select
            className="select select-bordered"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Date Added (Newest First)</option>
            <option value="oldest">Date Added (Oldest First)</option>
            <option value="lowestPrice">Price (Lowest First)</option>
            <option value="highestPrice">Price (Highest First)</option>
          </select>

          <div className="join ml-1">
            <button
              className={`btn btn-outline btn-sm join-item ${viewMode === "grid" ? "btn-active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            <button
              className={`btn btn-outline btn-sm join-item ${viewMode === "list" ? "btn-active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletons.map((_, i) => (
            <div
              key={i}
              className="card bg-base-100/70 backdrop-blur border border-base-300/40 shadow animate-pulse"
            >
              <div className="h-48 w-full bg-base-300/70" />
              <div className="card-body">
                <div className="h-5 w-2/3 bg-base-300/70 rounded" />
                <div className="h-4 w-24 bg-base-300/70 rounded mt-2" />
                <div className="h-4 w-32 bg-base-300/70 rounded mt-4" />
                <div className="h-8 w-full bg-base-300/70 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="alert alert-error my-4">
          <span>{error}</span>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && list.length === 0 && (
        <div className="text-center text-base-content/60 py-10">
          No cars match your search. Try clearing filters or check back later.
        </div>
      )}

      {/* Grid/List */}
      {!loading && !error && list.length > 0 && (
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {list.map((car) => {
            const img = car?.images?.[0] || placeholder;
            const addedStr = car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : "N/A";
            const showNew = isNewSince(car.dateAdded, 7);

            const CardImage = (
              <div className={viewMode === "grid" ? "aspect-[4/3] w-full overflow-hidden rounded-xl" : ""}>
                <img
                  src={img}
                  alt={car.model || "Car"}
                  className={`${viewMode === "grid" ? "w-full h-full object-cover" : "w-40 h-28 object-cover rounded-lg"}`}
                  onError={(e) => (e.currentTarget.src = placeholder)}
                />
              </div>
            );

            return (
              <div
                key={car._id}
                className={`
                  group border border-base-300/40 bg-base-100/80 backdrop-blur
                  rounded-xl shadow hover:shadow-lg transition-all
                  ${viewMode === "list" ? "p-4 flex gap-4 items-center" : "p-3"}
                `}
              >
                {/* Image */}
                {viewMode === "grid" ? (
                  <div className="relative mb-3">
                    {CardImage}
                    {/* badges */}
                    <div className="absolute left-3 top-3 flex gap-2">
                      <span
                        className={`badge text-white ${car.availability ? "badge-success" : "badge-error"}`}
                      >
                        {car.availability ? "Available" : "Unavailable"}
                      </span>
                      {showNew && <span className="badge badge-accent">New</span>}
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-xl" />
                  </div>
                ) : (
                  <>
                    {CardImage}
                    <div className="hidden sm:flex flex-col gap-2">
                      <span
                        className={`badge ${car.availability ? "badge-success" : "badge-error"} text-white`}
                      >
                        {car.availability ? "Available" : "Unavailable"}
                      </span>
                      {showNew && <span className="badge badge-accent">New</span>}
                    </div>
                  </>
                )}

                {/* Body */}
                <div className={`${viewMode === "grid" ? "px-1 pb-2" : "flex-1"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-semibold">{car.model || "Vehicle"}</h3>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-blue-700">
                        ${fmtMoney(car.dailyPrice)}
                      </div>
                      <div className="text-xs text-base-content/60 -mt-0.5">per day</div>
                    </div>
                  </div>

                  {car.location && (
                    <div className="mt-1 text-sm text-base-content/70">
                      Location: <span className="font-medium text-base-content">{car.location}</span>
                    </div>
                  )}

                  <div className="text-xs text-base-content/50">
                    Added: {addedStr}
                  </div>

                  <div className={`mt-3 ${viewMode === "list" ? "" : "px-0"}`}>
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="
                        btn btn-sm w-full
                        bg-gradient-to-r from-blue-600 to-cyan-500 text-white
                        hover:from-blue-700 hover:to-cyan-600
                        shadow hover:shadow-md transition
                      "
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Booking Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-base-100 rounded-xl shadow-xl w-full max-w-md relative border border-base-300/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="btn btn-ghost btn-sm absolute top-2 right-2"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Book {selectedCar.model}</h3>
              <div className="text-sm text-base-content/60 mb-4">
                Daily rate: <span className="font-semibold text-base-content">${fmtMoney(selectedCar.dailyPrice)}</span>
              </div>

              <div className="space-y-3">
                <input
                  type="date"
                  min={todayStr}
                  value={bookingDates.startDate}
                  onChange={(e) => setBookingDates({ ...bookingDates, startDate: e.target.value })}
                  className="input input-bordered w-full"
                />
                <input
                  type="date"
                  min={bookingDates.startDate || todayStr}
                  value={bookingDates.endDate}
                  onChange={(e) => setBookingDates({ ...bookingDates, endDate: e.target.value })}
                  className="input input-bordered w-full"
                />

                {/* Summary */}
                {bookingDates.startDate && bookingDates.endDate && (
                  <div className="rounded-lg bg-base-200 p-3 text-sm">
                    {(() => {
                      const n = daysBetween(bookingDates.startDate, bookingDates.endDate);
                      const valid = n > 0;
                      const total = valid ? n * (selectedCar.dailyPrice || 0) : 0;
                      return (
                        <>
                          <div>
                            Trip length:{" "}
                            <span className="font-semibold">
                              {valid ? `${n} day${n > 1 ? "s" : ""}` : "—"}
                            </span>
                          </div>
                          <div>
                            Estimated total:{" "}
                            <span className="font-semibold">
                              {valid ? `$${fmtMoney(total)}` : "—"}
                            </span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={submitting}
                  className="
                    btn w-full
                    bg-gradient-to-r from-blue-600 to-cyan-500 text-white
                    hover:from-blue-700 hover:to-cyan-600
                    shadow hover:shadow-md transition
                  "
                >
                  {submitting ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
