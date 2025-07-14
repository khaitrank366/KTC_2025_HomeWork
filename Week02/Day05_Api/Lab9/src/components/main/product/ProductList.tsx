import React, { useEffect, useState } from "react";
import type { Product } from "../../../types/Product.types";
import { useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../../../service/productServices";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      setError("Product not load. Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        alert("Product not deleted. Error: " + error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center text-lg font-medium bg-red-100 p-4 rounded-md">
          {error}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Product name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Image
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((prod) => (
                <tr key={prod.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700">{prod.id}</td>
                  <td className="py-3 px-4 text-gray-700">{prod.name}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {prod.description}
                  </td>
                  <td className="py-3 px-4 text-green-600 font-medium">
                    ${prod.price}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{prod.quantity}</td>
                  <td className="py-3 px-4">
                    <img
                      src={prod.imgUrl}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <button
                      onClick={() => navigate(`/products/${prod.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => navigate(`/products/${prod.id}/edit`)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-500 transition duration-200"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
