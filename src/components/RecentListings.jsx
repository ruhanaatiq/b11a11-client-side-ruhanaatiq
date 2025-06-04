import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Try fetching cars from your API
        const response = await axios.get("http://localhost:3000/cars", {
          headers,
        });

        const sorted = response.data.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );
        setCars(sorted.slice(0, 8));
      } catch (err) {
        // If token required but not present or error, fallback to public data fetch
        if (err.response?.status === 401 || err.response?.status === 403) {
          // fallback fetch without token from public API or mock data
          try {
            // example: fallback public endpoint if you have one
            const publicResponse = await axios.get("http://localhost:3000/cars");
            const sorted = publicResponse.data.sort(
              (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
            );
            setCars(sorted.slice(0, 8));
          } catch (publicErr) {
            setError("Failed to load cars for guest users.");
          }
        } else {
          setError("Failed to fetch cars.");
        }
      }
    };

    fetchCars();
  }, []);

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center">Recent Listings</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cars.map((car, idx) => (
            <div
              key={idx}
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
      </div>
    </section>
  );
};

export default RecentListings;
