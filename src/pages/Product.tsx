import { useParams } from "react-router";
import { useProducts } from "../context/productsContext";
import type { ProductType } from "../types";
import { useEffect, useState } from "react";

const Product = () => {
  const [currentProduct, setCurrentProduct] = useState<ProductType>();
  const [activeImg, setActiveImg] = useState<string>("");
  const { id } = useParams();
  const { products } = useProducts();

  const handleImageClick = (e: string) => {
    setActiveImg(e);
  };

  useEffect(() => {
    setCurrentProduct(products.find((e) => e.id === Number(id)));
  }, [products, id]);
  return (
    <div>
      <section style={{ display: "flex" }}>
        {/* Product Image */}
        <div>
          {/* Main Image  */}
          <div style={{ width: "200px", height: "300px" }}>
            <img
              src={activeImg || currentProduct?.thumbnail}
              alt={currentProduct?.title}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {/* Additional Images  */}
          <div style={{ display: "flex", gap: "1rem", cursor: "pointer" }}>
            {currentProduct?.images.map((e) => (
              <div
                key={e}
                style={{ width: "100px", height: "80px" }}
                onClick={() => handleImageClick(e)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleImageClick(e.value);
                  }
                }}
              >
                <img
                  key={e}
                  src={e}
                  alt={currentProduct?.title}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Product Details */}
        <div></div>
      </section>
    </div>
  );
};

export default Product;
