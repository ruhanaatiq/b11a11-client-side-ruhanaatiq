// src/components/SpecialOffers.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const offers = [
  {
    title: "Get 15% off for weekend rentals!",
    subtitle: "Book Friday–Sunday and save more on your next trip.",
    cta: { label: "Book Now", to: "/available-cars" },
    badge: "WEEKEND15",
    note: "Limited time • T&C apply",
    // Deep ocean → cyan beam
    bg: "from-[#0ea5e9] via-[#2563eb] to-[#0ea5e9]", // cyan-500 → blue-600 → cyan-500
  },
  {
    title: "Luxury Cars at $99/day!",
    subtitle: "Holiday season special. Drive premium for less.",
    cta: { label: "Learn More", to: "/learn-more" },
    badge: "LUX99",
    note: "On selected models • T&C apply",
    // Royal blue sweep
    bg: "from-[#1d4ed8] via-[#0ea5e9] to-[#1d4ed8]", // blue-700 → cyan-500 → blue-700
  },
];

const fadeIn = {
  hidden: (dir) => ({
    opacity: 0,
    x: dir === "left" ? -60 : 60,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function SpecialOffers() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-16
                 bg-gradient-to-b from-base-200/70 to-base-100"
      aria-labelledby="special-offers-heading"
    >
      {/* soft background blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-400/10 blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2
            id="special-offers-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            🎉 Special Offers
          </h2>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
          <p className="mt-3 text-base-content/60">
            Save more with time-limited promos and seasonal deals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {offers.map((offer, i) => {
            const dir = i % 2 === 0 ? "left" : "right";
            return (
              <motion.article
                key={offer.title}
                className={`
                  relative overflow-hidden rounded-2xl p-6 md:p-7 text-white
                  shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]
                  bg-gradient-to-r ${offer.bg}
                  ring-1 ring-white/15
                `}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                custom={dir}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
              >
                {/* glossy sweep effect */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 top-0 h-full w-24 rotate-6 bg-white/10 blur-md motion-safe:animate-[sweep_3s_linear_infinite]"
                />
                {/* gradient vignette for depth */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
                />

                <div className="relative z-10">
                  {/* badge row */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge badge-accent badge-outline text-white/90">
                      {offer.badge}
                    </span>
                    <span className="badge badge-ghost bg-white text-blue-500">
                      Limited Offer
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-white/90">{offer.subtitle}</p>
                  <p className="mt-1 text-xs opacity-80">{offer.note}</p>

                  <div className="mt-5 flex items-center gap-3">
                    <Link to={offer.cta.to} aria-label={offer.cta.label}>
                      <button
                        className="
                          btn btn-sm bg-white text-black hover:bg-white/90
                          rounded-full px-5 md:px-6 font-semibold
                          shadow-md hover:shadow-lg
                        "
                      >
                        {offer.cta.label}
                      </button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => navigator.clipboard?.writeText(offer.badge)}
                      className="
                        btn btn-sm md:btn-md btn-outline border-white/40 text-white
                        hover:border-white hover:bg-white/10 rounded-full
                      "
                      aria-label={`Copy coupon ${offer.badge}`}
                      title="Copy coupon"
                    >
                      Copy Code
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* keyframes for glossy sweep */}
      <style>{`
        @keyframes sweep {
          0% { transform: translateX(0) rotate(6deg); opacity: .0; }
          40% { opacity: .25; }
          100% { transform: translateX(140%) rotate(6deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
