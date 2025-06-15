import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LearnMore = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 rounded-lg shadow mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Drive Luxury at Just $99/day!</h1>
        <p className="text-lg md:text-xl">Holiday offer on BMW, Audi, Mercedes, and more.</p>
        <Link to="/available-cars">
          <button className="mt-6 bg-white text-blue-700 px-6 py-3 font-semibold rounded hover:bg-blue-100 transition">
            Browse Eligible Cars
          </button>
        </Link>
      </div>

      {/* Highlights Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: "💸", title: "Flat Rate", desc: "Fixed $99/day on select luxury cars." },
          { icon: "🚘", title: "Premium Cars", desc: "Drive BMW, Audi, Mercedes & more." },
          { icon: "🛡️", title: "Full Coverage", desc: "Includes insurance and roadside support." },
          { icon: "📆", title: "Limited Time", desc: "Offer valid Dec 15 – Jan 5 only." },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-lg shadow text-gray-700"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2">{item.icon} {item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {["https://i.ibb.co/N253vF8w/BMW-3-Series-2021-7.jpg", "https://i.ibb.co/YDZJWwN/nissan-altima.jpg", "https://i.ibb.co/GvH3gmCR/Chevrolet-1.jpg"].map((src, idx) => (
          <img key={idx} src={src} alt="Luxury car" className="rounded-lg shadow" />
        ))}
      </div>

      

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Don't Miss Out!</h3>
        <p className="text-gray-600 mb-4">Book your dream ride before the offer ends.</p>
        <Link to="/available-cars">
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            Book Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LearnMore;
