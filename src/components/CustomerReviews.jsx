import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    name: "Sarah Jones",
    avatar: "https://i.ibb.co/B5CH7nKb/cybertruck.jpg",
    rating: 5,
    feedback: "Amazing service! The car was clean and well-maintained. Booking was super easy.",
  },
  {
    name: "Jonathan Ray",
    avatar: "https://i.ibb.co/bjzgDPK3/range.jpg",
    rating: 4,
    feedback: "Good pricing and smooth experience. Would definitely rent again!",
  },
  {
    name: "Joe Jonas",
    avatar: "https://i.ibb.co/N253vF8w/BMW-3-Series-2021-7.jpg",
    rating: 5,
    feedback: "Customer support was helpful and the vehicle performed perfectly on my trip.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="bg-blue-300 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-blue-900">Customer Reviews</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-blue-900">{review.name}</h3>
              <div className="flex justify-center text-yellow-400 my-2">
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} />
                  ))}
              </div>
              <p className="text-gray-600 text-sm">{review.feedback}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
