import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productServices";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<{
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
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product ID");
        return;
      }
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct({
          name: data.name || "",
          price: data.price || "",
          brand: data.brand || "",
          category: data.category || "",
        });
      } catch (error) {
        setError(
          "Failed to load product: " +
            (error instanceof Error ? error.message : "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !product.name.trim() ||
      !product.price.trim() ||
      !product.brand.trim() ||
      !product.category.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      if (id) {
        await updateProduct(id, product);
        alert("Product updated successfully!");
        navigate("/");
      }
    } catch (error) {
      setError(
        "Failed to update product: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
        <p className="text-red-500 text-center text-lg font-medium bg-red-100 p-4 rounded-md">
          {error}
        </p>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Return to Product List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
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
            value={product.name}
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
            value={product.price}
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
            value={product.brand}
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
            value={product.category}
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

export default EditProduct;