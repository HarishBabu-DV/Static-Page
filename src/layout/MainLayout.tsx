import { Outlet } from "react-router";
import Header from "../components/Header";

const MainLayout = () => {
  return (
    <div style={{ maxWidth: "1920px", width: "100%", marginInline: " auto" }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
