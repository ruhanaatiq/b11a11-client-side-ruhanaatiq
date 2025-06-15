import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const offers = [
  {
    title: "Get 15% off for weekend rentals!",
    subtitle: "Book now and save big on Friday–Sunday bookings.",
    buttonText: "Book Now",
    bg: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    title: "Luxury Cars at $99/day!",
    subtitle: "This holiday season, drive premium for less.",
    buttonText: "Learn More",
    bg: "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
  },
];

const SpecialOffers = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">🎉 Special Offers</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-2xl shadow-xl text-white ${offer.bg} relative overflow-hidden`}
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-2xl font-semibold">{offer.title}</h3>
            <p className="mt-2 mb-4">{offer.subtitle}</p>
            <Link to={offer.buttonText === "Learn More" ? "/learn-more" : "/available-cars"}>
  <button className="px-4 py-2 bg-white text-black font-medium rounded hover:scale-105 transition-transform">
    {offer.buttonText}
  </button>
</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
