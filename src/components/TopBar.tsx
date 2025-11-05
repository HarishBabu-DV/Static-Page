import { PhoneOutlined } from "@ant-design/icons";
import { topBarData } from "../constants/topBarData";
import { Select } from "antd";
const TopBar = () => {
  const { languages, locations } = topBarData;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 5rem",
        backgroundColor: "#0a3c0cff",
        color: "white",
        height: "40px",
      }}
      className="text-[0.85rem]"
    >
      <div className="flex items-center gap-2">
        <span>
          <PhoneOutlined
            style={{
              color: "white",
              transform: "rotate(90deg)",
              fontSize: "1.05rem",
            }}
          />
        </span>
        <span>+1 234 567 89</span>
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
        <span className="underline">Shop Now</span>
      </div>
      <div className="flex items-center">
        <div className="outer-select  **:text-[0.85rem]">
          <Select
            defaultValue={languages[0].value}
            style={{
              width: 70,
              border: "0px",
              color: "0a3c0cff",
            }}
            options={languages}
          />
        </div>
        <div className="outer-select **:text-[0.85rem] **:font-bold">
          <Select
            defaultValue={locations[0].value}
            style={{ width: 100, border: "0px" }}
            options={locations}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
