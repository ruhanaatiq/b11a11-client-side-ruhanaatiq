// src/components/RecentListings.jsx
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

/* ---- helpers ---- */
const fmtMoney = (n) =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { minimumFractionDigits: 0 })
    : "—";

const daysBetween = (a, b = new Date()) =>
  Math.floor((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));

const placeholder =
  "https://images.unsplash.com/photo-1549921296-3fd62c953cf5?q=80&w=1400&auto=format&fit=crop";

/* ---- animation variants ---- */

// whole grid wrapper
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

// each card – direction comes from `custom`
const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    y: 30,
    x: direction, // slide from left/right
    scale: 0.96,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function RecentListings() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await api.get("/cars");
        const sorted = (res?.data ?? [])
          .slice()
          .sort(
            (a, b) => new Date(b?.dateAdded || 0) - new Date(a?.dateAdded || 0)
          );

        if (alive) setCars(sorted.slice(0, 8));
      } catch (err) {
        if (alive) {
          if (err.response?.status === 401 || err.response?.status === 403) {
            setError("Please log in to view recent listings.");
          } else {
            setError("Failed to fetch cars.");
          }
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const skeletons = useMemo(() => new Array(8).fill(0), []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 bg-gradient-to-b from-base-200/60 to-base-100/40"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Recent Listings
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {skeletons.map((_, i) => (
              <div
                key={i}
                className="card bg-base-100/60 backdrop-blur border border-base-300/40 shadow animate-pulse"
              >
                <div className="h-48 w-full bg-base-300/60" />
                <div className="card-body">
                  <div className="h-5 w-2/3 bg-base-300/70 rounded" />
                  <div className="h-4 w-24 bg-base-300/70 rounded mt-2" />
                  <div className="h-4 w-32 bg-base-300/70 rounded mt-4" />
                  <div className="h-8 w-full bg-base-300/70 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="max-w-xl mx-auto alert alert-error shadow mb-4">
            <span>{error}</span>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && cars.length === 0 && (
          <p className="text-center text-base-content/60">
            No listings available.
          </p>
        )}

        {/* Animated grid */}
        {!loading && !error && cars.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {cars.map((car, idx) => {
              const img = car?.images?.[0] || placeholder;
              const addedDate = new Date(car?.dateAdded || Date.now());
              const isNew = daysBetween(addedDate) <= 7;
              const slideFrom = idx % 2 === 0 ? -40 : 40; // alternate left/right

              return (
                <motion.div
                  key={car._id}
                  variants={cardVariants}
                  custom={slideFrom}
                  className="
                    group card overflow-hidden
                    bg-base-100/80 backdrop-blur border border-base-300/40
                    shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)]
                    hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)]
                    transition-all duration-300 motion-safe:hover:-translate-y-1
                  "
                >
                  {/* Image area */}
                  <figure className="relative h-48 w-full overflow-hidden">
                    <img
                      src={img}
                      alt={car?.model || "Car"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      onError={(e) => {
                        e.currentTarget.src = placeholder;
                      }}
                    />

                    {/* Availability badge */}
                    <div className="absolute left-3 top-3">
                      {car?.availability ? (
                        <span className="badge badge-success gap-1 text-white">
                          <FaCheckCircle className="text-xs" />
                          Available
                        </span>
                      ) : (
                        <span className="badge badge-error gap-1 text-white">
                          <FaTimesCircle className="text-xs" />
                          Not Available
                        </span>
                      )}
                    </div>

                    {/* New badge */}
                    {isNew && (
                      <div className="absolute right-0 top-3">
                        <span className="badge badge-accent">New</span>
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </figure>

                  {/* Card body */}
                  <div className="card-body">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg md:text-xl font-semibold text-base-content">
                        {car?.model || "Vehicle"}
                      </h3>
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-blue-700">
                          ${fmtMoney(car?.dailyPrice)}
                        </div>
                        <div className="text-xs text-base-content/60 -mt-0.5">
                          per day
                        </div>
                      </div>
                    </div>

                    <div className="mt-1 text-sm text-base-content/70">
                      Bookings:{" "}
                      <strong className="text-base-content">
                        {car?.bookingCount ?? 0}
                      </strong>
                    </div>

                    <div className="text-xs text-base-content/50">
                      Added: {addedDate.toLocaleDateString()}
                    </div>

                    {/* Actions */}
                    <div className="card-actions mt-3 items-center justify-between">
                      <Link
                        to={`/cars/${car?._id}`}
                        className="
                          btn btn-sm btn-outline
                          motion-safe:transition-all motion-safe:hover:-translate-y-0.5
                        "
                      >
                        View Details
                      </Link>
                      {car?.availability ? (
                        <Link
                          to={`/book/${car?._id}`}
                          className="
                            btn btn-sm bg-gradient-to-r from-blue-600 to-cyan-500
                            hover:from-blue-700 hover:to-cyan-600 text-white
                            shadow hover:shadow-md
                            motion-safe:transition-all motion-safe:hover:-translate-y-0.5
                          "
                        >
                          Book Now
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-sm btn-disabled"
                          disabled
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
