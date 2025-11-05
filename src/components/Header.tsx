import { Link } from "react-router";
import { Input } from "antd";
import { navItems, navItemsData } from "../constants/navItems";
import TopBar from "./TopBar";
import { Select } from "antd";
const Header = () => {
  const { Search } = Input;
  const { categories, quickAccess } = navItemsData;
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 100,
      }}
    >
      <TopBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "2rem",
          backgroundColor: "#ffffffff",
          padding: "5px 45px",
        }}
      >
        {/* Left Side */}
        <div className="flex-align-center  justify-center  gap-16 ">
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
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
            <h2
              style={{ fontSize: "1.8rem" }}
              className="font-semibold text-secondary"
            >
              Shopcart
            </h2>
          </div>

          {/* Nav Items */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div className=" no-border-select">
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
                    fontSize: "1rem",
                    textDecoration: "none",
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        {/* Right Side */}

        <div className="flex-align-center gap-12">
          {/* Search Bar  */}
          <Search
            placeholder="Search product"
            allowClear
            className="search-bar"
            style={{ width: 300, borderRadius: "60px" }}
          />
          {/* Quick Access  */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {quickAccess.map((e) => (
              <Link
                key={e.name}
                to={e.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  textDecoration: "none",
                  gap: "0.4rem",
                }}
                className="font-normal"
              >
                <span>{<e.icon />}</span>
                <span>{e.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
