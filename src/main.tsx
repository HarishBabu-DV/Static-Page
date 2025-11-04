import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { GlobalProducts } from "./context/productsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalProducts>
        <App />
      </GlobalProducts>
    </BrowserRouter>
  </StrictMode>
);
