import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import api from "../api/api";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCars = async () => {
    try {
      const res = await api.get(`/cars?email=${user?.email}`);
      setCars(res.data.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)));
    } catch {
      toast.error("Failed to fetch your cars");
    }
  };

  useEffect(() => {
    if (user?.email) fetchCars();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return;

    setDeletingId(id);
    try {
      await api.delete(`/cars/${id}`);
      toast.success("Car deleted");
      setCars(cars.filter(car => car._id !== id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const updatedCar = {
      model: form.model.value,
      dailyPrice: parseFloat(form.dailyPrice.value),
      availability: form.availability.value === "true",
      registrationNumber: form.registrationNumber.value,
      features: form.features.value.split(',').map(f => f.trim()),
      description: form.description.value,
      images: [form.image.value],
      location: form.location.value,
    };

    try {
      await api.put(`/cars/${selectedCar._id}`, updatedCar);
      toast.success("Car updated successfully");
      fetchCars();
      document.getElementById("update_modal").close();
    } catch {
      toast.error("Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">My Cars</h2>

      {cars.length === 0 ? (
        <p className="text-center">
          No cars added yet. <a href="/add-car" className="text-blue-500 underline">Add a Car</a>
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Model</th>
                <th>Price/Day</th>
                <th>Bookings</th>
                <th>Availability</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={car.images?.[0] || "https://via.placeholder.com/100"}
                      alt="car"
                      className="w-20 h-14 object-cover"
                    />
                  </td>
                  <td>{car.model}</td>
                  <td>${car.dailyPrice}</td>
                  <td>{car.bookingCount || 0}</td>
                  <td>{car.availability ? "Available" : "Not Available"}</td>
                  <td>{car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : "N/A"}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        setSelectedCar(car);
                        setTimeout(() => {
                          document.getElementById("update_modal").showModal();
                        }, 0);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(car._id)}
                      disabled={deletingId === car._id}
                    >
                      {deletingId === car._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal - Render only if selectedCar is set */}
      {selectedCar && (
        <dialog id="update_modal" className="modal">
          <div className="modal-box">
            <form onSubmit={handleUpdate}>
              <h3 className="font-bold text-lg mb-4">Update Car</h3>

              <input name="model" defaultValue={selectedCar.model || ""} className="input input-bordered w-full mb-2" placeholder="Car Model" required />
              <input name="dailyPrice" type="number" defaultValue={selectedCar.dailyPrice || ""} className="input input-bordered w-full mb-2" placeholder="Price per day" required />
              <select
                name="availability"
                defaultValue={selectedCar.availability ? "true" : "false"}
                className="select select-bordered w-full mb-2"
              >
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              <input name="registrationNumber" defaultValue={selectedCar.registrationNumber || ""} className="input input-bordered w-full mb-2" placeholder="Registration No." />
              <input name="features" defaultValue={selectedCar.features?.join(", ") || ""} className="input input-bordered w-full mb-2" placeholder="Features (GPS, AC...)" />
              <input name="location" defaultValue={selectedCar.location || ""} className="input input-bordered w-full mb-2" placeholder="Location" />
              <input name="image" defaultValue={selectedCar.images?.[0] || ""} className="input input-bordered w-full mb-2" placeholder="Image URL" />
              <textarea name="description" defaultValue={selectedCar.description || ""} className="textarea textarea-bordered w-full mb-2" placeholder="Description"></textarea>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary" disabled={!selectedCar || loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
                <button type="button" className="btn" onClick={() => document.getElementById("update_modal").close()}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyCars;
