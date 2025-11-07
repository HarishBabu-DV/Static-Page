import { Link } from "react-router";
import { Card, Input } from "antd";
import { navItems, navItemsData } from "../constants/navItems";
import TopBar from "./TopBar";
import { Select } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCategories } from "../context/categoriesContext";
import type { CategoryType } from "../types";
const Header = () => {
  const { Search } = Input;
  const { categoriesList, quickAccess } = navItemsData;
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { categories, setCategories } = useCategories();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/products/category-list"
        );
        const categoriesNames: string[] = data;

        // Step 2: Fetch first product thumbnail for each category
        const categoryData: CategoryType[] = await Promise.all(
          categoriesNames?.map(async (name: string, i: number) => {
            const { data } = await axios.get(
              `https://dummyjson.com/products/category/${name}`
            );
            const thumbnail = data.products?.[0]?.thumbnail || "";
            return { id: i + 1, name, url: thumbnail };
          })
        );
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  console.log("categories", categories);
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
          padding: "5px 50px",
        }}
      >
        {/* ---------- Left Side ---------- */}
        <div className="flex-align-center  justify-between   w-[25%] ">
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".15rem",
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
              style={{ fontSize: "1.3rem" }}
              className="font-semibold text-secondary"
            >
              Shopcart
            </h2>
          </div>
          <div className=" no-border-select">
            {/* Categories  */}
            <Select
              defaultValue="categories"
              style={{ width: 110, border: "0px" }}
              options={categoriesList}
            />
          </div>
        </div>
        {/* ---------- Right Side ---------- */}
        <div className="w-[75%] flex-align-center  justify-between">
          {/* Nav Items  and Search Bar  */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              justifyContent: "space-around",
              width: "73%",
              position: "relative",
            }}
          >
            {/* Navitems  */}
            <nav style={{ display: "flex", gap: "2.2rem" }}>
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
            {/* Search Bar  */}
            <Search
              placeholder="Search product"
              allowClear
              className="search-bar"
              style={{
                width: "100%",
                borderRadius: "60px ",
                transition: "position 400ms ease-out",
                ...(isSearch && {
                  position: "absolute",
                  top: "0px",
                  zIndex: 1000,
                  backgroundColor: "rgba(243, 243, 243)",
                }),
              }}
              onFocus={() => setIsSearch(true)}
              onBlur={() => setIsSearch(false)}
            />
          </div>
          {/* Quick Access  */}
          <div className="flex-align-center  w-[23%] ">
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
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
      </div>

      {/* Categories Suggestion Box  */}

      {/* <Card>
        {categories.map((e) => (
          <Card key={e.id} style={{ width: 90 }}>
      
            <div key={e.id}>
              <img src="" alt="" />
            </div>
          </Card>
        ))}
      </Card> */}
    </header>
  );
};

export default Header;
