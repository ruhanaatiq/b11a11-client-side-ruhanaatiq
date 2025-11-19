import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/api";
import toast from "react-hot-toast";

const AddCar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
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
      await api.post("/cars", carData);
      toast.success("✅ Car added successfully!");
      reset();
      navigate("/available-cars");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("❌ Failed to add car.");
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 to-white flex items-center">
      <div className="max-w-4xl w-full mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-500 font-semibold">
            Host Your Car
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Add a New Car to <span className="text-blue-600">DriveNow</span>
          </h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Share your car with trusted renters and start earning. Provide clear
            details so drivers can quickly find the perfect match.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl border border-blue-100 p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-slate-700">
                    Car Model
                  </span>
                </label>
                <input
                  {...register("model", { required: "Car model is required" })}
                  placeholder="e.g., Toyota Prius 2018"
                  className="input input-bordered w-full"
                />
                {errors.model && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.model.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-slate-700">
                    Daily Price (BDT)
                  </span>
                </label>
                <input
                  {...register("dailyPrice", {
                    required: "Daily price is required",
                  })}
                  placeholder="e.g., 2000"
                  type="number"
                  className="input input-bordered w-full"
                />
                {errors.dailyPrice && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.dailyPrice.message}
                  </p>
                )}
              </div>
            </div>

            {/* Availability + Registration */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-slate-700">
                    Availability
                  </span>
                </label>
                <select
                  {...register("available", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-slate-700">
                    Registration Number
                  </span>
                </label>
                <input
                  {...register("registrationNumber", {
                    required: "Registration number is required",
                  })}
                  placeholder="e.g., DHAKA-METRO-G-12-3456"
                  className="input input-bordered w-full"
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Features & Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold text-slate-700">
                    Features
                    <span className="text-xs font-normal text-slate-400 ml-1">
                      (comma separated)
                    </span>
                  </span>
                </label>
                <input
                  {...register("features")}
                  placeholder="e.g., AC, Automatic, Bluetooth, Backup Camera"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold text-slate-700">
                    Location
                  </span>
                </label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="e.g., Dhaka, Banani"
                  className="input input-bordered w-full"
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-slate-700">
                  Car Image URL
                </span>
              </label>
              <input
                {...register("image", { required: "Image URL is required" })}
                placeholder="Paste a high-quality image URL of the car"
                className="input input-bordered w-full"
              />
              <p className="mt-1 text-xs text-slate-400">
                Tip: Use a clear front or 3/4 angle photo of the car.
              </p>
              {errors.image && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-slate-700">
                  Description
                </span>
              </label>
              <textarea
                {...register("description")}
                placeholder="Share details like mileage, condition, rules (no smoking, etc.)"
                className="textarea textarea-bordered w-full min-h-[120px]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-2 font-semibold tracking-wide disabled:opacity-70"
            >
              {isSubmitting ? "Adding Car..." : "Add Car"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCar;
