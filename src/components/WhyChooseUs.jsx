import { FaCar, FaDollarSign, FaHeadset, FaRegClock } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCar className="text-blue-500 text-4xl animate-bounce" />,
      title: "Wide Variety of Cars",
      desc: "From budget-friendly rides to premium luxury vehicles.",
    },
    {
      icon: <FaDollarSign className="text-green-500 text-4xl animate-pulse" />,
      title: "Affordable Prices",
      desc: "Enjoy competitive daily rates that fit your budget.",
    },
    {
      icon: <FaRegClock className="text-yellow-500 text-4xl animate-bounce" />,
      title: "Easy Booking Process",
      desc: "Book your ride in just a few simple clicks.",
    },
    {
      icon: <FaHeadset className="text-purple-500 text-4xl animate-pulse" />,
      title: "24/7 Customer Support",
      desc: "We're here to assist you anytime, anywhere.",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="card shadow-xl bg-white hover:shadow-2xl transition duration-300"
            >
              <div className="card-body items-center text-center">
                <div className="mb-4">{item.icon}</div>
                <h3 className="card-title text-blue-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
