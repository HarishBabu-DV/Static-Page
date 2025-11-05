import { Button } from "antd";
import { heroData } from "../../constants/heroData";

const HeroSection = () => {
  const { heading, description, buttonText } = heroData;
  return (
    <section className="hero-section">
      <div
        style={{
          height: "100%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <h1 className="hero-heading">{heading}</h1>
        <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "#0a3c0cff" }}>
          {description}
        </p>
        <Button
          type="primary"
          style={{
            backgroundColor: "#0a3c0cff",
            color: "white",
            borderRadius: "40px",
            width: "120px",
            padding: "20px 10px",
          }}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
