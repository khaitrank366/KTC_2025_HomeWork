import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productServices";

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState<{
    name: string;
    price: string;
    brand: string;
    category: string;
  }>({
    name: "",
    price: "",
    brand: "",
    category: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !newProduct.name.trim() ||
      !newProduct.price.trim() ||
      !newProduct.brand.trim() ||
      !newProduct.category.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await createProduct(newProduct);
      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      setError("Failed to add product: " + error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
      {error && (
        <p className="text-red-500 text-center text-lg font-medium bg-red-100 p-4 rounded-md mb-6">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Enter product price"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={newProduct.brand}
            onChange={handleInputChange}
            placeholder="Enter product brand"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Enter product category"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;