import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
  return (
    <div className="w-full mx-auto">
      <div className="carousel w-full h-[80vh]">
        {/* Slide 1 */}
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/Cs7WVfzD/banner.jpg" className="w-full object-cover" alt="Banner Slide 1" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <Typewriter words={['Drive Your Dreams Today!']} loop={false} cursor />
            </h2>
            <Link to="/available-cars">
              <button className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all">
                View Available Cars
              </button>
            </Link>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 2 */}
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/tMkwJ9s7/banner2.jpg" className="w-full object-cover" alt="Banner Slide 2" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <Typewriter words={['Your Next Car Awaits You!']} loop={false} cursor />
            </h2>
            <Link to="/available-cars">
              <button className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all">
                View Available Cars
              </button>
            </Link>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://i.ibb.co/5WN8XtCF/banner3.jpg" className="w-full object-cover" alt="Banner Slide 3" />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <Typewriter words={['Feel the Power of Every Ride!']} loop={false} cursor />
            </h2>
            <Link to="/available-cars">
              <button className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all">
                View Available Cars
              </button>
            </Link>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide1" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
