import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetch("https://your-server.com/cars") // Update with your API endpoint
      .then(res => res.json())
      .then(data => {
        const availableCars = data.filter(car => car.availability === true);
        setCars(sortCars(availableCars, sortOption));
      });
  }, [sortOption]);

  const sortCars = (cars, option) => {
    const sorted = [...cars];
    switch (option) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      case "lowPrice":
        return sorted.sort((a, b) => a.dailyPrice - b.dailyPrice);
      case "highPrice":
        return sorted.sort((a, b) => b.dailyPrice - a.dailyPrice);
      default:
        return sorted;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Available Cars</h2>

        <div className="flex gap-3 items-center">
          <select
            className="select select-bordered"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="newest">Date: Newest First</option>
            <option value="oldest">Date: Oldest First</option>
            <option value="lowPrice">Price: Lowest First</option>
            <option value="highPrice">Price: Highest First</option>
          </select>

          <ToggleGroup type="single" value={view} onValueChange={setView}>
            <ToggleGroupItem value="grid">🔳 Grid</ToggleGroupItem>
            <ToggleGroupItem value="list">📃 List</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {cars.map((car, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
              <img src={car.images[0]} alt={car.model} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{car.model}</h3>
                <p className="text-sm text-gray-500">${car.dailyPrice}/day</p>
                <p className="text-sm text-green-600 font-medium">
                  {car.availability ? "Available" : "Unavailable"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Added {Math.floor((Date.now() - new Date(car.dateAdded)) / (1000 * 60 * 60 * 24))} days ago
                </p>
                <Link to={`/car/${car._id}`}>
                  <button className="mt-3 btn btn-primary w-full">Book Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {cars.map((car, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden">
              <img src={car.images[0]} alt={car.model} className="w-full md:w-64 h-48 object-cover" />
              <div className="p-4 flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-xl">{car.model}</h3>
                  <p className="text-gray-500">${car.dailyPrice}/day</p>
                </div>
                <p className="text-sm text-gray-600">{car.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Added {Math.floor((Date.now() - new Date(car.dateAdded)) / (1000 * 60 * 60 * 24))} days ago
                </p>
                <Link to={`/car/${car._id}`}>
                  <button className="mt-4 btn btn-outline btn-primary">Book Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
