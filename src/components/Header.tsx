import { Link } from "react-router";
import { Input } from "antd";
import { navItems, navItemsData } from "../constants/navItems";
import TopBar from "./TopBar";
const Header = () => {
  const { Search } = Input;
  const { categories, quickAccess } = navItemsData;
  return (
    <>
      <TopBar />
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
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

        <div>
          {/* Categories  */}
          <select name="categories" id="categories">
            {categories.map((category) => (
              <option key={category.name} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* Navitems  */}
        <nav>
          {navItems.map((item) => (
            <Link key={item.id} to={item.path}>
              {item.name}
            </Link>
          ))}
        </nav>
        {/* Search Bar  */}
        <Search
          placeholder="Search product"
          allowClear
          style={{ width: 200 }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {quickAccess.map((e) => (
            <Link
              key={e.name}
              to={e.name}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span>{<e.icon />}</span>
              <span>{e.name}</span>
            </Link>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
