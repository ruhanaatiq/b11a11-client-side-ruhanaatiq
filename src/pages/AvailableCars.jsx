import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ✅ import axios

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    axios
      .get("http://localhost:3000/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Failed to load cars:", err));
  }, []);

  const sortedCars = [...cars].sort((a, b) => {
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
          <button
            className="btn btn-outline btn-sm mr-2"
            onClick={() => setViewMode("grid")}
          >
            Grid View
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setViewMode("list")}
          >
            List View
          </button>
        </div>
      </div>

      {/* Cars List */}
      <div
        className={
          viewMode === "grid"
            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {sortedCars.map((car) => (
          <div
            key={car._id}
            className={`border rounded p-4 shadow-sm ${
              viewMode === "list" ? "flex items-center gap-4" : ""
            }`}
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
                Added:{" "}
                {car.dateAdded
                  ? new Date(car.dateAdded).toLocaleDateString()
                  : "N/A"}
              </p>
              <Link
                to={`/cars/${car._id}`}
                className="btn btn-sm bg-orange-500 text-white mt-2"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
