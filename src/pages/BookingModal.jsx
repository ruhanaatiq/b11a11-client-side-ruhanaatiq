import { useState, useEffect } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";

export default function BookingModal({ car, isOpen, onClose }) {
  const axiosSecure = useAxiosSecure();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [ranges, setRanges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && car?._id) {
      axiosSecure
        .get(`/bookings/car/${car._id}`)
        .then((res) => setRanges(res.data.bookings))
        .catch(() => setRanges([]));
    }
  }, [isOpen, car?._id, axiosSecure]);

  async function handleBook() {
    if (!from || !to) return toast.error("Select a date range");
    setLoading(true);
    try {
      const { data } = await axiosSecure.get(`/cars/${car._id}/availability`, {
        params: { from, to },
      });
      if (!data.available) {
        toast.error("These dates are already booked!");
        return;
      }
      await axiosSecure.post("/bookings", {
        carId: car._id,
        startDate: from,
        endDate: to,
      });
      toast.success("Booking created!");
      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Book {car?.model}</h2>
        <div className="space-y-3">
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="input input-bordered w-full" />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="input input-bordered w-full" />
          <button className="btn btn-primary w-full" onClick={handleBook} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>

        <div className="mt-4 text-sm">
          <strong>Unavailable ranges:</strong>
          <ul>
            {ranges.length === 0 && <li className="text-gray-500">None</li>}
            {ranges.map((r, i) => (
              <li key={i}>
                {new Date(r.startDate).toISOString().slice(0, 10)} → {new Date(r.endDate).toISOString().slice(0, 10)}
              </li>
            ))}
          </ul>
        </div>

        <button className="btn btn-ghost mt-4 w-full" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
