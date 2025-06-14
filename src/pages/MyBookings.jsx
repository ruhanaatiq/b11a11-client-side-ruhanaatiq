import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../api/api";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);

  useEffect(() => {
    if (user?.email) {
      api.get(`/bookings?email=${user.email}`).then((res) => {
        setBookings(res.data);
      });
    }
  }, [user]);

  const handleCancel = async () => {
    try {
      await api.patch(`/bookings/${selectedBooking._id}`, { status: "Canceled" });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, status: "Canceled" } : b
        )
      );
      toast.success("Booking canceled successfully.");
    } catch (err) {
      toast.error("Failed to cancel booking.");
    } finally {
      setShowCancelModal(false);
    }
  };

  const handleModify = async (newDate) => {
    try {
      const isoDate = new Date(newDate).toISOString();
      await api.patch(`/bookings/${selectedBooking._id}`, {
        bookingDate: isoDate,
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === selectedBooking._id ? { ...b, bookingDate: isoDate } : b
        )
      );
      toast.success("Booking date updated.");
    } catch (err) {
      toast.error("Failed to update booking date.");
    } finally {
      setShowModifyModal(false);
    }
  };

  const isValidDate = (date) => {
    const d = new Date(date);
    return date && !isNaN(d);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <table className="table-auto w-full text-sm border-collapse">
          <thead className="bg-red-600 text-left font-semibold">
            <tr>
              <th className="p-2">Car Image</th>
              <th className="p-2">Car Model</th>
              <th className="p-2">Booking Date</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-yellow-300">
                <td className="p-2">
                  <img
                    src={booking.carImage}
                    alt={booking.model}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{booking.carModel}</td>
                <td className="p-2">
                  {isValidDate(booking.bookingDate)
                    ? new Date(booking.bookingDate).toLocaleString("en-GB")
                    : "Invalid date"}
                </td>
                <td className="p-2">${booking.totalPrice}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      booking.status === "Confirmed"
                        ? "bg-green-500"
                        : booking.status === "Canceled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModifyModal(true);
                    }}
                  >
                    🗕️ Modify Date
                  </button>
                  {booking.status !== "Canceled" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowCancelModal(true);
                      }}
                    >
                      🗑️ Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to cancel this booking?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {showModifyModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-blue-600 p-6 rounded shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">Modify Booking Date</h3>
            <input
              type="datetime-local"
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) =>
                setSelectedBooking({
                  ...selectedBooking,
                  bookingDate: e.target.value,
                })
              }
              value={
                isValidDate(selectedBooking.bookingDate)
                  ? new Date(selectedBooking.bookingDate).toISOString().slice(0, 16)
                  : ""
              }
              className="border p-2 w-full"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModifyModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleModify(selectedBooking.bookingDate)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
