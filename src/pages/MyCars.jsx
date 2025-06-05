import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/cars?email=${user?.email}`);
      setCars(res.data);
    } catch (error) {
      toast.error("Failed to fetch your cars");
    }
  };

  useEffect(() => {
    if (user?.email) fetchCars();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      toast.success("Car deleted");
      setCars(cars.filter(car => car._id !== id));
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      model: form.model.value,
      dailyPrice: parseFloat(form.dailyPrice.value),
      availability: form.availability.value,
      registrationNumber: form.registrationNumber.value,
      features: form.features.value,
      description: form.description.value,
      image: form.image.value,
      location: form.location.value,
    };

    try {
      await axios.put(`http://localhost:3000/cars/${selectedCar._id}`, updatedCar);
      toast.success("Car updated successfully");
      fetchCars();
      document.getElementById("update_modal").close();
    } catch (err) {
      toast.error("Failed to update car");
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
                  <td><img src={car.images || "https://via.placeholder.com/100"} alt="car" className="w-20" /></td>
                  <td>{car.model}</td>
                  <td>${car.dailyPrice}</td>
                  <td>{car.bookingCount || 0}</td>
                  <td>{car.availability}</td>
                  <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button className="btn btn-sm btn-outline" onClick={() => {
                      setSelectedCar(car);
                      document.getElementById("update_modal").showModal();
                    }}>Update</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(car._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inline Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <form method="dialog" onSubmit={handleUpdate}>
            <h3 className="font-bold text-lg mb-4">Update Car</h3>
            <input name="model" defaultValue={selectedCar?.model} className="input input-bordered w-full mb-2" placeholder="Car Model" required />
            <input name="dailyPrice" type="number" defaultValue={selectedCar?.dailyPrice} className="input input-bordered w-full mb-2" placeholder="Price per day" required />
            <input name="availability" defaultValue={selectedCar?.availability} className="input input-bordered w-full mb-2" placeholder="Availability" required />
            <input name="registrationNumber" defaultValue={selectedCar?.registrationNumber} className="input input-bordered w-full mb-2" placeholder="Registration No." />
            <input name="features" defaultValue={selectedCar?.features} className="input input-bordered w-full mb-2" placeholder="Features (GPS, AC...)" />
            <input name="location" defaultValue={selectedCar?.location} className="input input-bordered w-full mb-2" placeholder="Location" />
            <input name="image" defaultValue={selectedCar?.image} className="input input-bordered w-full mb-2" placeholder="Image URL" />
            <textarea name="description" defaultValue={selectedCar?.description} className="textarea textarea-bordered w-full mb-2" placeholder="Description"></textarea>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn" onClick={() => document.getElementById("update_modal").close()}>Cancel</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyCars;
