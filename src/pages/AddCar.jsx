import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const AddCar = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const carData = {
      model: data.model,
      dailyPrice: parseFloat(data.dailyPrice),
      registrationNumber: data.registrationNumber,
      features: data.features.split(",").map((f) => f.trim()),
      description: data.description,
      location: data.location,
      image: data.image,
      available: data.available === "true",
      bookingCount: 0,
      email: user?.email,
      dateAdded: new Date(),
      status: "available",
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/cars", carData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Car added successfully!");
      reset();
      navigate("/available-cars");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("❌ Failed to add car.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Add a Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input {...register("model", { required: true })} placeholder="Car Model" className="input input-bordered w-full" />
        <input {...register("dailyPrice", { required: true })} placeholder="Daily Rental Price" type="number" className="input input-bordered w-full" />
        <select {...register("available", { required: true })} className="select select-bordered w-full">
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <input {...register("registrationNumber", { required: true })} placeholder="Vehicle Registration Number" className="input input-bordered w-full" />
        <input {...register("features")} placeholder="Features (comma separated)" className="input input-bordered w-full" />
        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input {...register("location", { required: true })} placeholder="Location" className="input input-bordered w-full" />
        <input {...register("image", { required: true })} placeholder="Image URL" className="input input-bordered w-full" />

        <button type="submit" className="btn bg-orange-500 text-white w-full">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
