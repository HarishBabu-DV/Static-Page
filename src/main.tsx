import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { GlobalProducts } from "./context/productsContext.tsx";
import { GlobalCategories } from "./context/categoriesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Global Products and Categories */}
      <GlobalCategories>
        <GlobalProducts>
          <App />
        </GlobalProducts>
      </GlobalCategories>
    </BrowserRouter>
  </StrictMode>
);
