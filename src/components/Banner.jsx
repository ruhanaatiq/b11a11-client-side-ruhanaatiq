import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
};

const Banner = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-full mx-auto"
    >
      <div className="carousel w-full h-[80vh]">

        {/* SLIDE 1 */}
        <div id="slide1" className="carousel-item relative w-full">

          {/* Zooming Background */}
          <motion.img 
            variants={zoomIn}
            src="https://i.ibb.co/Cs7WVfzD/banner.jpg"
            className="w-full object-cover"
            alt="Banner Slide 1" 
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">

            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <Typewriter 
                words={['Drive Your Dreams Today!']}
                loop={false}
                cursor={true}
              />
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Link to="/available-cars">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500
                             hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg shadow-xl 
                             transition-all"
                >
                  View Available Cars
                </motion.button>
              </Link>
            </motion.div>

          </div>

          {/* Controls */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* SLIDE 2 */}
        <div id="slide2" className="carousel-item relative w-full">

          <motion.img
            variants={zoomIn}
            src="https://i.ibb.co/tMkwJ9s7/banner2.jpg"
            className="w-full object-cover"
            alt="Banner Slide 2"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">

            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              <Typewriter words={['Your Next Car Awaits You!']} loop={false} cursor />
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Link to="/available-cars">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xl transition-all"
                >
                  View Available Cars
                </motion.button>
              </Link>
            </motion.div>

          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* SLIDE 3 */}
        <div id="slide3" className="carousel-item relative w-full">

          <motion.img
            variants={zoomIn}
            src="https://i.ibb.co/5WN8XtCF/banner3.jpg"
            className="w-full object-cover"
            alt="Banner Slide 3"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">

            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">
              <Typewriter words={['Feel the Power of Every Ride!']} loop={false} cursor />
            </motion.h2>

            <motion.div variants={fadeInUp}>
              <Link to="/available-cars">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xl transition-all"
                >
                  View Available Cars
                </motion.button>
              </Link>
            </motion.div>

          </div>

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Banner;
