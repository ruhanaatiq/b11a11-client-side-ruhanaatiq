import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookingModalRef = useRef(null);

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });

  const todayStr = new Date().toISOString().split("T")[0];

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
      bookingModalRef.current.close();
      navigate("/login");
      return;
    }

    try {
      setBookingLoading(true);
      await api.post("/bookings", {
        carId: car._id,
        startDate: bookingDates.startDate,
        endDate: bookingDates.endDate,
      });

      toast.success("Booking successful!");
      bookingModalRef.current.close();
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking error:", err);
      if (err.response?.status === 403) {
        toast.error("Session expired. Please log in.");
        localStorage.removeItem("access-token");
        navigate("/login");
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
          <p><strong>Price Per Day:</strong> ${car.dailyPrice}</p>
          <p><strong>Availability:</strong> {car.availability ? "Available" : "Not Available"}</p>
          <p><strong>Features:</strong> {car.features?.join(", ") || "N/A"}</p>
          <p><strong>Description:</strong> {car.description || "No description provided."}</p>
          <button
            className="btn bg-orange-500 text-white"
            onClick={() => bookingModalRef.current.showModal()}
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

          <div className="space-y-3 mb-4">
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

          <div className="modal-action flex gap-3 justify-end">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => bookingModalRef.current.close()}
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
