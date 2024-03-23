import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "./components";
const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-14"><Outlet /></div>
      <Footer />
    </>
  );
};

export default Layout;
