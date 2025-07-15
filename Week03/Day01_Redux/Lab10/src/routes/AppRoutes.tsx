import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import EditProduct from "../components/main/ProductEdit";
import ProductList from "../components/main/ProductList";
import ProductDetail from "../components/main/ProductDetail";
import AddProduct from "../components/main/ProductAdd";

const AppRoutes = () => {
  return (
    <Router>
      <div className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 rounded-md bg-blue-600 text-white font-medium"
                : "px-3 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            }
          >
            Product List
          </NavLink>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products-lab/:id" element={<ProductDetail />} />
        <Route path="/products-lab/add" element={<AddProduct />} />
        <Route path="/products-lab/:id/edit" element={<EditProduct />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
