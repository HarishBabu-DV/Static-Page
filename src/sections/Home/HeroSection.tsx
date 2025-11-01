import { Button } from "antd";
import { heroData } from "../../constants/heroData";

const HeroSection = () => {
  const { heading, description, buttonText } = heroData;
  return (
    <section className="hero-section">
      <h1>{heading}</h1>
      <p>{description}</p>
      <Button type="primary">{buttonText}</Button>
    </section>
  );
};

export default HeroSection;
