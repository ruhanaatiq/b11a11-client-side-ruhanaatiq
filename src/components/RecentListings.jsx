import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const RecentListings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Simulated fetch – replace this with your actual API call
    fetch('http://localhost:3000/cars') // or from your backend
      .then(res => res.json())
      .then(data => {
        // Sort by dateAdded descending and take latest 8
        const sorted = data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        setCars(sorted.slice(0, 8));
      });
  }, []);

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
                <h3 className="text-xl font-semibold">{car.model}</h3>
                <p className="text-blue-600 font-medium">${car.dailyPrice}/day</p>

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
