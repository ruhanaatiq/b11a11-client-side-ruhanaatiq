import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/cars/${id}`)
      .then(res => setCar(res.data))
      .catch(err => console.error("Failed to fetch car:", err));
  }, [id]);

  if (!car) return <p className="text-center mt-10">Loading car details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-orange-600 mb-6">{car.model}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={car.images?.[0] || "https://via.placeholder.com/400x300"}
          alt={car.model}
          className="w-full h-72 object-cover rounded"
        />
        <div className="space-y-3">
          <p><strong>Price Per Day:</strong> ${car.dailyPrice}</p>
          <p><strong>Availability:</strong> {car.availability || "Available"}</p>
          <p><strong>Features:</strong> {car.features?.join(", ") || "N/A"}</p>
          <p><strong>Description:</strong> {car.description || "No description provided."}</p>
          {/* Trigger the modal */}
          <button className="btn bg-orange-500 text-white" onClick={() => document.getElementById('bookingModal').showModal()}>
            Book Now
          </button>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="bookingModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Booking</h3>
          <p className="py-2"><strong>Model:</strong> {car.model}</p>
          <p className="py-2"><strong>Price/Day:</strong> ${car.dailyPrice}</p>
          <p className="py-2"><strong>Availability:</strong> {car.availability || "Available"}</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-outline">Cancel</button>
              <button
                className="btn bg-orange-500 text-white"
                onClick={() => {
                  // Handle booking logic here
                  alert("Booking Confirmed!");
                }}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CarDetails;
