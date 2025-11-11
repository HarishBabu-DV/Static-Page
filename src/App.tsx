import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Product from "./pages/Product";
import { Route, Routes } from "react-router";
import Products from "./pages/Products";
import CategoryProducts from "./pages/CategoryProducts";

const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/product/:id" element={<Product />} />
				<Route
					path="/products/category/:productCategory"
					element={<CategoryProducts />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
