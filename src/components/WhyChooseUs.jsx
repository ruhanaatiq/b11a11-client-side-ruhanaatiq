import { FaCar, FaDollarSign, FaHeadset, FaRegClock } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaCar,
      title: "Wide Variety of Cars",
      desc: "From budget-friendly rides to premium luxury vehicles.",
      tone: "from-blue-500 to-cyan-400",
    },
    {
      icon: FaDollarSign,
      title: "Affordable Prices",
      desc: "Enjoy competitive daily rates that fit your budget.",
      tone: "from-emerald-500 to-lime-400",
    },
    {
      icon: FaRegClock,
      title: "Easy Booking Process",
      desc: "Book your ride in just a few simple clicks.",
      tone: "from-amber-500 to-yellow-400",
    },
    {
      icon: FaHeadset,
      title: "24/7 Customer Support",
      desc: "We're here to assist you anytime, anywhere.",
      tone: "from-violet-500 to-fuchsia-400",
    },
  ];

  return (
    <section
      className="
        relative py-16 md:py-20
        bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#0b1220]
        text-white
      "
    >
      {/* subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose Us?
          </h2>
          <p className="mt-3 text-white/70">
            Premium experience, transparent pricing, and support you can trust.
          </p>
          {/* underline accent */}
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map(({ icon: Icon, title, desc, tone }, idx) => (
            <div
              key={idx}
              className="
                group card overflow-hidden
                bg-white/5 backdrop-blur
                border border-white/10
                shadow-[0_6px_30px_-12px_rgba(0,0,0,0.5)]
                hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]
                transition-all duration-300
                motion-safe:hover:-translate-y-1
              "
            >
              <div className="card-body items-center text-center">
                {/* icon halo */}
                <div className="relative mb-5">
                  <div
                    className={`
                      absolute inset-0 blur-xl opacity-40 rounded-full
                      bg-gradient-to-br ${tone}
                    `}
                  />
                  <div
                    className={`
                      relative grid place-items-center h-16 w-16 rounded-full
                      ring-1 ring-white/20
                      bg-gradient-to-br ${tone}
                      text-white
                    `}
                  >
                    <Icon className="text-2xl" />
                  </div>
                </div>

                <h3 className="card-title text-white">{title}</h3>
                <p className="text-white/70">{desc}</p>

                {/* tiny underline that animates on hover */}
                <span
                  className="
                    mt-3 block h-0.5 w-8 rounded-full
                    bg-white/20
                    group-hover:w-16 group-hover:bg-white/40
                    transition-all duration-300
                  "
                />
              </div>
            </div>
          ))}
        </div>

        {/* bottom CTA strip (optional; remove if not needed) */}
        <div className="mt-12 text-center">
          <a
            href="/available-cars"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              font-semibold
              bg-gradient-to-r from-blue-600 to-cyan-500
              hover:from-blue-700 hover:to-cyan-600
              shadow-lg hover:shadow-2xl
              motion-safe:transition-all motion-safe:hover:scale-[1.03]
            "
          >
            Explore Available Cars
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
