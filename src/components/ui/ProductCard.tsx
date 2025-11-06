import type {
  FavoriteButtonProps,
  ProductCardProps,
  RatingsProps,
} from "../../types";
import { useEffect, useState } from "react";
import {
  Favorite,
  FavoriteBorder,
  Star,
  StarBorder,
  StarHalf,
} from "@mui/icons-material";

// Favorite Button
const FavoriteButton = ({ id }: FavoriteButtonProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    const favoriteProducts = localStorage.getItem("favoriteProducts");
    //  Add or remove item
    if (favoriteProducts) {
      let favoriteProductsArr = JSON.parse(favoriteProducts) as number[];

      if (!favoriteProductsArr.includes(id)) {
        favoriteProductsArr.push(id);
      } else {
        favoriteProductsArr = favoriteProductsArr.filter(
          (item: number) => Number(item) !== Number(id)
        );
      }
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProductsArr)
      );
    } else {
      const favoriteProductsArr = [id];
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(favoriteProductsArr)
      );
    }
    setIsFavorite(!isFavorite);
  };
  useEffect(() => {
    const favoriteProducts = localStorage.getItem("favoriteProducts");

    if (favoriteProducts) {
      const favoriteProductsArr = JSON.parse(favoriteProducts);
      if (favoriteProductsArr.includes(id)) {
        setIsFavorite(true);
      }
    }
  }, [id]);
  return (
    <div
      style={{
        cursor: "pointer",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 20,
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: ".3rem",
      }}
      onClick={handleFavorite}
    >
      {isFavorite ? (
        <Favorite style={{ color: "red", fontSize: "1.35rem" }} />
      ) : (
        <FavoriteBorder style={{ color: "gray", fontSize: "1.35rem" }} />
      )}
    </div>
  );
};

// Ratings with stars
const Ratings = ({ rating }: RatingsProps) => {
  const totalStars: number = 5;
  const fullStars = Math.floor(rating);
  const decimalPart: number = rating - fullStars;
  const halfStars: boolean = decimalPart >= 0.5;
  const emptyStars: number = totalStars - fullStars - Number(halfStars);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        {fullStars &&
          [...Array(fullStars)].map((_) => (
            <Star className="star-style" key={_} sx={{ fontSize: "1.09rem" }} />
          ))}
        {halfStars && (
          <StarHalf className="star-style" sx={{ fontSize: "1.09rem" }} />
        )}
        {emptyStars > 0 &&
          [...Array(emptyStars)].map((_) => (
            <StarBorder
              className="star-style"
              key={_}
              sx={{ fontSize: "1.09rem" }}
            />
          ))}
      </div>
      <span className="text-[0.8rem]">({rating})</span>
    </div>
  );
};

const ProductCard = ({
  prodId,
  width,
  height,
  imgSrc,
  imgAlt,
  title,
  description,
  price,
  rating,
}: ProductCardProps) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "5px",
      }}
    >
      {/* Card Media  */}
      <div style={{ width, height, position: "relative" }}>
        <img
          src={imgSrc}
          alt={imgAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="bg-gray-100"
        />
        <FavoriteButton id={prodId} />
      </div>
      {/* <Divider style={{ borderColor: "#afafafff", margin: 0 }} /> */}
      {/* Card Content  */}
      <div
        style={{
          paddingInline: "0.7rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          paddingBlock: "0.8rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span className="product-heading">{title}</span>
          <span style={{ fontSize: "1.2rem" }}>${price}</span>
        </div>
        <p className="product-description">{description}</p>
        <Ratings rating={rating} />
        <button
          type="button"
          style={{
            border: "1.5px solid #272727ff",
            padding: "0.4rem 0.85rem",
            fontSize: "0.76rem",
            borderRadius: "20px",
            width: "max-content",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
