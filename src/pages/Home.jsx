import Banner from '../components/Banner';
import RecentListings from '../components/RecentListings';
import WhyChooseUs from '../components/WhyChooseUs';

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs></WhyChooseUs>
      <RecentListings></RecentListings>
    </div>
  );
};

export default Home;