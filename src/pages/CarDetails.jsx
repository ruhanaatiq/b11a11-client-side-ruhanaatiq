import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";                 // public GETs are fine here
import useAxiosSecure from "../hooks/useAxiosSecure"; // for auth routes
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const bookingModalRef = useRef(null);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [rangesLoading, setRangesLoading] = useState(false);
  const [ranges, setRanges] = useState([]); // [{startDate, endDate}]
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });

  const todayStr = new Date().toISOString().split("T")[0];

  /* -------- Load car -------- */
  useEffect(() => {
    api
      .get(`/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => {
        console.error("Car fetch failed:", err);
        setError("Failed to load car details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  /* -------- Open modal + fetch unavailable ranges -------- */
  const openBooking = async () => {
    if (!car?._id) return;
    bookingModalRef.current?.showModal();
    setRangesLoading(true);
    try {
      // optional window to keep payload small
      const { data } = await axiosSecure.get(`/bookings/car/${car._id}`, {
        params: { from: todayStr },
      });
      setRanges(data.bookings || []);
    } catch {
      setRanges([]);
    } finally {
      setRangesLoading(false);
    }
  };

  /* -------- Helpers -------- */
  const daysBetween = (from, to) => {
    if (!from || !to) return 0;
    const start = new Date(from);
    const end = new Date(to);
    // non-inclusive; change to +1 for inclusive if that matches your server calc
    return Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  };

  const pricePreview = () => {
    const d = daysBetween(bookingDates.startDate, bookingDates.endDate);
    const rate = Number(car?.dailyPrice ?? car?.price ?? 0);
    return d > 0 ? d * rate : 0;
  };

  /* -------- Create booking with availability check -------- */
  const handleBooking = async () => {
    if (!bookingDates.startDate || !bookingDates.endDate) {
      toast.error("Please select both dates.");
      return;
    }

    const start = new Date(bookingDates.startDate);
    const end = new Date(bookingDates.endDate);
    if (start >= end) {
      toast.error("End date must be after start date.");
      return;
    }

    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("Please login to book.");
      bookingModalRef.current?.close();
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);

      // 1) Quick availability check (server prevents overlaps too)
      const avail = await axiosSecure.get(`/cars/${car._id}/availability`, {
        params: { from: bookingDates.startDate, to: bookingDates.endDate },
      });
      if (!avail.data?.available) {
        toast.error("Those dates are already booked!");
        return;
      }

      // 2) Create booking
      await axiosSecure.post("/bookings", {
        carId: car._id,
        startDate: bookingDates.startDate,
        endDate: bookingDates.endDate,
      });

      toast.success("Booking successful!");
      bookingModalRef.current?.close();
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking error:", err);
      const msg = err.response?.data?.error;
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.error("Session expired. Please log in.");
        localStorage.removeItem("access-token");
        navigate("/login");
      } else if (msg) {
        toast.error(msg);
      } else {
        toast.error("Booking failed. Try again.");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">{car.model}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={car.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={car.model}
          className="w-full h-72 object-cover rounded"
        />
        <div className="space-y-3">
          <p><strong>Price Per Day:</strong> ${car.dailyPrice ?? car.price}</p>
          <p><strong>Availability:</strong> {car.availability ? "Available" : "Not Available"}</p>
          <p><strong>Features:</strong> {car.features?.join(", ") || "N/A"}</p>
          <p><strong>Description:</strong> {car.description || "No description provided."}</p>
          <button
            className="btn bg-orange-500 text-white"
            onClick={openBooking}
            disabled={!car.availability}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <dialog id="bookingModal" className="modal" ref={bookingModalRef}>
        <form method="dialog" className="modal-box" onSubmit={(e) => e.preventDefault()}>
          <h3 className="font-bold text-lg mb-4">Book {car.model}</h3>

          <div className="space-y-3 mb-2">
            <div>
              <label className="block mb-1 font-semibold">Start Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                min={todayStr}
                value={bookingDates.startDate}
                onChange={(e) => setBookingDates({ ...bookingDates, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">End Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                min={bookingDates.startDate || todayStr}
                value={bookingDates.endDate}
                onChange={(e) => setBookingDates({ ...bookingDates, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Price preview */}
          <div className="text-sm mb-3">
            <strong>Estimated total:</strong> ${pricePreview()}
          </div>

          {/* Unavailable ranges */}
          <div className="text-sm border rounded p-2 max-h-28 overflow-auto">
            <div className="font-semibold mb-1">Unavailable ranges</div>
            {rangesLoading && <div>Loading…</div>}
            {!rangesLoading && ranges.length === 0 && <div className="text-gray-500">None</div>}
            {!rangesLoading && ranges.map((r, i) => (
              <div key={i}>
                {new Date(r.startDate).toISOString().slice(0, 10)} → {new Date(r.endDate).toISOString().slice(0, 10)}
              </div>
            ))}
          </div>

          <div className="modal-action flex gap-3 justify-end">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => bookingModalRef.current?.close()}
              disabled={bookingLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bg-orange-500 text-white"
              onClick={handleBooking}
              disabled={bookingLoading}
            >
              {bookingLoading ? "Booking..." : "Confirm"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CarDetails;
