// src/components/Testimonials.jsx
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Frequent Business Traveler",
    text: "Smooth booking, clean cars, and on-time delivery. This is now my go-to service for every client visit.",
    rating: 5,
    location: "Dhaka, Bangladesh",
  },
  {
    name: "Imran Hossain",
    role: "Weekend Explorer",
    text: "Loved how easy it was to compare cars and book in just a few clicks. The support team was super helpful too!",
    rating: 4,
    location: "Chattogram, Bangladesh",
  },
  {
    name: "Sarah Ahmed",
    role: "Family Trip Planner",
    text: "We booked an SUV for a family trip and the experience was flawless. Highly recommended for safe, reliable rides.",
    rating: 5,
    location: "Sylhet, Bangladesh",
  },
];

/* Animation variants */
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 30,
    x: direction,
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Testimonials() {
  return (
    <motion.section
      id="testimonials"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="
        py-16 md:py-20
        bg-gradient-to-b from-base-100 to-base-200/70
      "
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
            Real experiences from drivers who booked their rides with us.
            Reliable cars, transparent pricing, and a smooth journey every time.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, idx) => {
            const direction = idx % 2 === 0 ? -35 : 35;

            return (
              <motion.div
                key={t.name}
                variants={cardVariants}
                custom={direction}
                className="
                  relative h-full
                  rounded-2xl bg-base-100 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)]
                  border border-base-300/60
                  p-6 md:p-7
                  overflow-hidden
                  group
                "
              >
                {/* Glow accent */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/10 blur-2xl group-hover:opacity-100 opacity-70 transition-opacity" />

                {/* Quote icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FaQuoteLeft className="text-sm" />
                </div>

                {/* Text */}
                <p className="text-sm md:text-base text-base-content/80 leading-relaxed">
                  “{t.text}”
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        "h-4 w-4 " +
                        (i < t.rating
                          ? "text-amber-400"
                          : "text-base-300")
                      }
                    />
                  ))}
                  <span className="ml-2 text-xs text-base-content/60">
                    {t.rating}.0 / 5.0
                  </span>
                </div>

                {/* Name + role */}
                <div className="mt-5 flex flex-col">
                  <span className="font-semibold text-base-content">
                    {t.name}
                  </span>
                  <span className="text-xs text-base-content/60">
                    {t.role} • {t.location}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
