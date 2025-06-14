import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/api";
import toast from "react-hot-toast";

const AddCar = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const carData = {
      model: data.model,
      dailyPrice: parseFloat(data.dailyPrice),
      registrationNumber: data.registrationNumber,
      features: data.features?.split(",").map((f) => f.trim()) || [],
      description: data.description || "",
      location: data.location,
      images: [data.image],
      availability: data.available === "true",
      bookingCount: 0,
      ownerEmail: user?.email,
      dateAdded: new Date(),
      status: "available",
    };

    try {
      await api.post("/cars", carData); // ✅ no extra `/api`
      toast.success("✅ Car added successfully!");
      reset();
      navigate("/available-cars");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("❌ Failed to add car.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Add a Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("model", { required: "Car model is required" })} placeholder="Car Model (e.g., Toyota Prius)" className="input input-bordered w-full" />
        {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}

        <input {...register("dailyPrice", { required: "Daily price is required" })} placeholder="Daily Price (e.g., 2000)" type="number" className="input input-bordered w-full" />
        {errors.dailyPrice && <p className="text-red-500 text-sm">{errors.dailyPrice.message}</p>}

        <select {...register("available", { required: true })} className="select select-bordered w-full">
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <input {...register("registrationNumber", { required: "Registration number required" })} placeholder="Registration Number (e.g., ABC-1234)" className="input input-bordered w-full" />
        {errors.registrationNumber && <p className="text-red-500 text-sm">{errors.registrationNumber.message}</p>}

        <input {...register("features")} placeholder="Features (comma separated)" className="input input-bordered w-full" />

        <textarea {...register("description")} placeholder="Description" className="textarea textarea-bordered w-full" />

        <input {...register("location", { required: "Location is required" })} placeholder="Location (e.g., Dhaka)" className="input input-bordered w-full" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

        <input {...register("image", { required: "Image URL is required" })} placeholder="Image URL" className="input input-bordered w-full" />
        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

        <button type="submit" className="btn bg-orange-500 text-white w-full">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
