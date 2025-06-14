import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingDates, setBookingDates] = useState({ startDate: "", endDate: "" });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/cars")
      .then((res) => setCars(res.data))
      .catch((err) => {
        console.error("Failed to load cars:", err);
        setError("Failed to load cars. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const availableCars = cars.filter((car) => car.availability !== false);

  const sortedCars = [...availableCars].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case "oldest":
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case "lowestPrice":
        return a.dailyPrice - b.dailyPrice;
      case "highestPrice":
        return b.dailyPrice - a.dailyPrice;
      default:
        return 0;
    }
  });

  const closeModal = () => {
    setSelectedCar(null);
    setBookingDates({ startDate: "", endDate: "" });
    setSubmitting(false);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">Available Cars</h2>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <div>
          <label className="mr-2 font-medium">Sort by:</label>
          <select
            className="select select-bordered"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="newest">Date Added (Newest First)</option>
            <option value="oldest">Date Added (Oldest First)</option>
            <option value="lowestPrice">Price (Lowest First)</option>
            <option value="highestPrice">Price (Highest First)</option>
          </select>
        </div>
        <div>
          <button className="btn btn-outline btn-sm mr-2" onClick={() => setViewMode("grid")}>
            Grid View
          </button>
          <button className="btn btn-outline btn-sm" onClick={() => setViewMode("list")}>
            List View
          </button>
        </div>
      </div>

      {/* Car List */}
      {loading ? (
        <p>Loading cars...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sortedCars.length === 0 ? (
        <p className="text-gray-500">No cars available right now.</p>
      ) : (
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedCars.map((car) => (
            <div
              key={car._id}
              className={`border rounded p-4 shadow-sm ${viewMode === "list" ? "flex items-center gap-4" : ""}`}
            >
              <img
                src={car.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={car.model}
                className={`${
                  viewMode === "grid" ? "w-full h-40 object-cover mb-4" : "w-40 h-28 object-cover"
                } rounded`}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{car.model}</h3>
                <p className="text-gray-600">Price: ${car.dailyPrice}</p>
                <p className="text-gray-600 text-sm mb-2">
                  Added: {car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : "N/A"}
                </p>
                <button
                  onClick={() => setSelectedCar(car)}
                  className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedCar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-96 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4 text-blue-600">Book {selectedCar.model}</h3>
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
              <button
                onClick={async () => {
                  const token = localStorage.getItem("access-token");
                  if (!token) {
                    toast.error("You must be logged in to book a car.");
                    return;
                  }

                  if (!bookingDates.startDate || !bookingDates.endDate) {
                    toast.error("Please select both start and end dates.");
                    return;
                  }

                  if (new Date(bookingDates.endDate) < new Date(bookingDates.startDate)) {
                    toast.error("End date cannot be before start date.");
                    return;
                  }

                  if (
                    new Date(bookingDates.endDate).getTime() ===
                    new Date(bookingDates.startDate).getTime()
                  ) {
                    toast.error("Booking must be at least one full day.");
                    return;
                  }

                  try {
                    setSubmitting(true);
                    await api.post("/bookings", {
                      carId: selectedCar._id,
                      startDate: bookingDates.startDate,
                      endDate: bookingDates.endDate,
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
                }}
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
