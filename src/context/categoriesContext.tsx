import type { CategoryType } from "../types";
import type { ProductType as Product } from "../types/product.types";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface CategoriesContextType {
  categories: CategoryType[];
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}

export const CategoriesContext = createContext<CategoriesContextType | null>(
  null
);

export const GlobalCategories = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
