import axios from "axios";
import { categories } from "../../constants";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";
import type { ProductType } from "../../types/product.types";
import ProductCard from "../../components/ui/ProductCard";
import { Link } from "react-router";
import {
  ProductsContext,
  useProducts,
  type ProductsContextType,
} from "../../context/productsContext";

const CategSection = () => {
  const { products, setProducts } = useProducts();
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("https://dummyjson.com/products");
      const products = data?.products;
      console.log(
        "products",
        products.map((e: any) => e.category)
      );
      setAllProducts(products);
      setProducts(products);
    };
    fetchProducts();
  }, [setProducts]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter((e) => e.category === selectedCategory));
    }
  }, [allProducts, selectedCategory, setProducts]);
  return (
    <section>
      <div className="px-16">
        <h1 className="text-[1.3rem] font-semibold  py-4">
          Shop Our Top Categories
        </h1>
        <div className="flex-align-center justify-center gap-12">
          {categories.map((e) => (
            <div key={e.id} className="w-52 h-[200px] relative rounded-[10px]">
              <img
                src={e.url}
                alt={e.name}
                className="w-full h-full rounded-[10px]"
              />
              <h2 className="absolute top-5 text-white text-[1.2rem] font-medium left-[50%] -translate-x-[50%]">
                {e.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <h1 style={{ textAlign: "center", paddingBlock: "1rem" }}>Categories</h1>
      {/* Categories List  */}
      <ul
        style={{
          listStyle: "none",

          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {categories.map((e) => (
          <li
            key={e.id}
            style={{
              backgroundColor: "#bababaff",
              padding: ".5rem 1rem",
              fontSize: "1.1rem",
              borderRadius: "5px",
              border: "1px solid #272727ff",
              cursor: "pointer",
            }}
            onClick={() => handleCategoryChange(e.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                handleCategoryChange(e.value);
              }
            }}
          >
            {e.name}
          </li>
        ))}
      </ul>
      {/* List of Products  */}
      <div className="product-container">
        {products?.map((prod) => (
          <Link
            key={prod.id}
            to={`/product/${prod.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ProductCard
              prodId={prod.id}
              width={"100%"}
              height={250}
              title={prod.title}
              imgSrc={prod.thumbnail}
              imgAlt={prod.title}
              description={prod.description}
              price={prod.price}
              rating={prod.rating}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategSection;
