import { Routes, Route } from "react-router-dom";
import AboutPage from "../pages/User/AboutPage";
import HomePage from "./../pages/User/HomePage";
import ListWisataPage from "../pages/User/ListWisataPage";
import Dashboard from "./../pages/admin/Dashboard";
import Navbar from "../pages/admin/Navbar";
import AboutA from "../pages/admin/AboutA";
import SidebarA from "../pages/admin/SidebarA";
import FormAboutA from "./../pages/admin/FormAboutA";
import DestinationA from "./../pages/admin/DestinationA";
import AddDestination from "../pages/admin/AddDestinationA";
import DetailWisataPage from "./../pages/User/DetailWisataPage";
import LoginA from "../pages/admin/loginA";
import ReviewUserA from "../pages/admin/ReviewUserA"; // ✅ tambahkan ini
import EditDestinationA from "../pages/admin/EditDestinationA";
import RegisterA from "../pages/admin/RegisterA";

const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/destination" element={<ListWisataPage />} />
      <Route path="/detail-destination/:id" element={<DetailWisataPage />} />

      {/* 🔐 Admin */}
      <Route path="/loginA" element={<LoginA />} />
      <Route path="/registerA" element={<RegisterA />} />
      <Route path="/dashboardA" element={<Dashboard />} />
      <Route path="/navbarA" element={<Navbar />} />
      <Route path="/sidebarA" element={<SidebarA />} />
      <Route path="/aboutA" element={<AboutA />} />
      <Route path="/destinationA" element={<DestinationA />} />
      <Route path="/formAbout" element={<FormAboutA />} />
      <Route path="/formDestination" element={<AddDestination />} />
      <Route path="/editDestination/:id" element={<EditDestinationA />} />
      <Route path="/reviewA" element={<ReviewUserA />} /> {/* ✅ route baru */}
    </Routes>
  );
};

export default AllRouting;
