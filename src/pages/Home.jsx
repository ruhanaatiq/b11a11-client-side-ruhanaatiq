import Banner from '../components/Banner';
import RecentListings from '../components/RecentListings';
import SpecialOffers from '../components/SpecialOffers';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerReviews from '../components/CustomerReviews';

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs></WhyChooseUs>
      <RecentListings></RecentListings>
      <SpecialOffers></SpecialOffers>
      <CustomerReviews></CustomerReviews>

    </div>
  );
};

export default Home;