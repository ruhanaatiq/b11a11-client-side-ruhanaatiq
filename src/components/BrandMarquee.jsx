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
    <div className="bg-white py-6">
      <Marquee gradient={false} speed={50} pauseOnHover>
        {brands.map((b, i) => (
          <div key={i} className="mx-8 flex items-center">
            <img
              src={b.img}
              alt={b.name}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
