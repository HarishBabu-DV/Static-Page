import { Link } from "react-router";
import { Input } from "antd";
import { navItems, navItemsData } from "../constants/navItems";
import TopBar from "./TopBar";
import { Select } from "antd";
import { Fragment } from "react/jsx-runtime";
const Header = () => {
  const { Search } = Input;
  const { categories, quickAccess } = navItemsData;
  return (
    <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 100 }}>
      <TopBar />
      <header
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "#ffffffff",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
            }}
          >
            <img
              src="/images/logo.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 500 }}>Shopcart</h2>
        </div>

        {/* Nav Items */}
        <div
          style={{
            display: "flex",
            width: "60%",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <div className="no-border-select">
            {/* Categories  */}
            <Select
              defaultValue="categories"
              style={{ width: 120, border: "0px" }}
              options={categories}
            />
          </div>
          {/* Navitems  */}
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                style={{
                  color: "black",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {/* Search Bar  */}
          <Search
            placeholder="Search product"
            allowClear
            style={{ width: 300, borderRadius: "50px" }}
          />
        </div>
        {/* Quick Access  */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {quickAccess.map((e) => (
            <Link
              key={e.name}
              to={e.name}
              style={{
                display: "flex",
                alignItems: "center",
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
                gap: "0.2rem",
                fontSize: "1.2rem",
              }}
            >
              <span>{<e.icon />}</span>
              <span>{e.name}</span>
            </Link>
          ))}
        </div>
      </header>
    </header>
  );
};

export default Header;
