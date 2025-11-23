import Banner from '../components/Banner';
import RecentListings from '../components/RecentListings';
import SpecialOffers from '../components/SpecialOffers';
import WhyChooseUs from '../components/WhyChooseUs';
import BrandMarquee from '../components/BrandMarquee';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div>
      <BrandMarquee/>
      <Banner />
      <WhyChooseUs></WhyChooseUs>
      <RecentListings></RecentListings>
      <Testimonials/>
      <SpecialOffers></SpecialOffers>
      

    </div>
  );
};

export default Home;