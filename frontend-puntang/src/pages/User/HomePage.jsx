import Footer from "../../components/Footer";
import About from "../../components/HomePage/About";
import Banner from "../../components/HomePage/Banner";
import Lokasi from "../../components/HomePage/Lokasi";
import WisataCard from "../../components/HomePage/WisataCard";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <About />
      <WisataCard />
      <Lokasi />
      <Footer />
    </div>
  );
};

export default HomePage;
