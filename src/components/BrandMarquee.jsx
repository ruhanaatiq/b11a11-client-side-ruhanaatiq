import Marquee from "react-fast-marquee";
import React from "react";

const brands = [
  { name: "TESLA", img: "https://i.ibb.co.com/Fkcp0nDf/tesla.png" },
  { name: "BMW", img: "https://i.ibb.co.com/bM1ZdXVB/bmw.jpg" },
  { name: "NISSAN", img: "https://i.ibb.co.com/xt4WXSjb/nissan.jpg" },
  { name: "MERCEDES", img: "https://i.ibb.co.com/dwR3WNPp/mercedes.jpg" },
  { name: "FORD", img: "https://i.ibb.co.com/NgkhFRrd/ford.jpg" },
  { name: "HONDA", img: "https://i.ibb.co.com/HTbQZLyd/HONDA.png" },
  { name: "CHEVROLET", img: "https://i.ibb.co.com/Jj7QNk9x/CHEVROLET.jpg" },
  { name: "JEEP", img: "https://i.ibb.co.com/d0g8vxzS/JEEP.jpg" },
];

export default function BrandMarquee() {
  return (
    <section className="relative py-10 bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Trusted Top Car Brands
        </h2>
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
      </div>

      {/* Glass container */}
      <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl shadow-lg py-6">
        <Marquee gradient={false} speed={55} pauseOnHover>
          {brands.map((b, i) => (
            <div
              key={i}
              className="mx-10 flex items-center justify-center group"
              title={b.name}
            >
              <div className="relative">
                {/* glow animation */}
                <span
                  className="absolute inset-0 rounded-md 
                  bg-gradient-to-br from-blue-500/20 to-cyan-400/20 
                  blur-xl opacity-0 group-hover:opacity-100 
                  transition duration-500"
                ></span>

                <img
                  src={b.img}
                  alt={b.name}
                  className="h-14 md:h-16 object-contain relative z-10
                  transition-transform duration-300 group-hover:scale-110"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/80x40?text=Brand")
                  }
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
