import { servicesData } from "../../constants/servicesData";

const ServicesSection = () => {
  const { heading, services } = servicesData;
  return (
    <div>
      <h1
        style={{ fontSize: "1.7rem", marginLeft: "100px", marginBlock: "10px" }}
      >
        {heading}
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "5rem",
        }}
      >
        {services.map((e) => (
          <div
            key={e.id}
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ecececff",
              width: "300px",
              height: "350px",
            }}
          >
            <div
              style={{
                height: "40%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
                paddingInline: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.7rem",
                }}
              >
                {e.name}
              </h2>
              <p style={{ paddingLeft: "1rem" }}>{e.description}</p>
            </div>
            <div style={{ width: "100%", height: "60%" }}>
              <img
                src={e.url}
                alt={e.name}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
