import { PhoneOutlined } from "@ant-design/icons";
const TopBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px",
        backgroundColor: "#0a3c0cff",
        color: "white",
        height: "40px",
      }}
    >
      <div>
        <PhoneOutlined style={{ color: "white" }} />
        +1 234 567 89
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          fontWeight: 600,
        }}
      >
        <span>Get 50% off on selected items </span>
        <span>|</span>
        <span>Shop Now</span>
      </div>
      <div>
        <select
          name=""
          id=""
          defaultValue="english"
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
        >
          <option value="english">English</option>
          <option value="tamil">Tamil</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
        </select>
        <select
          name=""
          id=""
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
          }}
        >
          <option value="india">India</option>
          <option value="england">England</option>
          <option value="argentina">Argentina</option>
          <option value="australia">Australia</option>
        </select>
      </div>
    </div>
  );
};

export default TopBar;
