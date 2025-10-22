import Banner from '../components/Banner';
import RecentListings from '../components/RecentListings';
import SpecialOffers from '../components/SpecialOffers';
import WhyChooseUs from '../components/WhyChooseUs';
import BrandMarquee from '../components/BrandMarquee';

const Home = () => {
  return (
    <div>
      <BrandMarquee/>
      <Banner />
      <WhyChooseUs></WhyChooseUs>
      <RecentListings></RecentListings>
      <SpecialOffers></SpecialOffers>
      

    </div>
  );
};

export default Home;