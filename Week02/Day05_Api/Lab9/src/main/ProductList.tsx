import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "../types/Product.type";
import { deleteProduct, getAllProducts } from "../services/productServices";

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      setError("Failed to load products: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (productIdToDelete) {
      try {
        await deleteProduct(productIdToDelete);
        setShowModal(false);
        setProductIdToDelete(null);
        alert("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product: " + error);
      }
    }
  };

  const openDeleteModal = (id: string) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  let content: React.ReactNode;

  if (loading) {
    content = (
      <div className="flex justify-center items-center h-64">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
      </div>
    );
  } else if (error) {
    content = (
      <p className="text-red-500 text-center text-lg font-medium bg-red-100 p-4 rounded-md">
        {error}
      </p>
    );
  } else {
    content = (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                ID
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Price
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Brand
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr
                key={prod.objectID}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700">{prod.objectID}</td>
                <td className="py-3 px-4 text-gray-700">{prod.name}</td>
                <td className="py-3 px-4 text-green-600 font-medium">
                  {prod.price}
                </td>
                <td className="py-3 px-4 text-gray-700">{prod.brand}</td>
                <td className="py-3 px-4 text-gray-700">{prod.category}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => navigate(`/products-lab/${prod.objectID}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => navigate(`/products-lab/${prod.objectID}/edit`)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-500 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(prod.objectID)}
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
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
        <button
          onClick={() => navigate("/products-lab/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </div>
      {content}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;