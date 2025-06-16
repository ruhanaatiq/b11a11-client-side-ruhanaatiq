import { useEffect, useState } from "react";
import api from "../api/api"; // your axios instance with interceptors
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");
        const sorted = response.data.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
        setCars(sorted.slice(0, 8));
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Please log in to view recent listings.");
        } else {
          setError("Failed to fetch cars.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="text-center mt-8 text-blue-500">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <section className="py-16 bg-amber-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-900">Recent Listings</h2>

        {cars.length === 0 ? (
          <p className="text-center text-gray-500">No listings available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="card shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 bg-white"
              >
                <figure className="h-48">
                  <img
                    src={car.images?.[0]}
                    alt={car.model}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="text-2xl font-semibold text-blue-700">{car.model}</h3>
                  <p className="text-orange-500 font-medium">${car.dailyPrice}/day</p>

                  <div className="flex items-center gap-2">
                    {car.availability ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <FaCheckCircle /> Available
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1">
                        <FaTimesCircle /> Not Available
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500">
                    Bookings: <strong>{car.bookingCount}</strong>
                  </p>

                  <p className="text-sm text-gray-400">
                    Added: {new Date(car.dateAdded).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
