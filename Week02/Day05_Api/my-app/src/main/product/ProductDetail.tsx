import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IProduct } from "../../types/Product.types";
import { getProductById } from "../../services/productServices";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (error) {
        setError("Product not load. Error: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
  } else if (product) {
    content = (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Detail
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-md self-center sm:self-start"
          />
          <ul className="flex-1 space-y-3">
            <li>
              <strong className="text-gray-600">ID:</strong>{" "}
              <span className="text-gray-800">{product.id}</span>
            </li>
            <li>
              <strong className="text-gray-600">Product Name:</strong>{" "}
              <span className="text-gray-800">{product.name}</span>
            </li>
            <li>
              <strong className="text-gray-600">Price:</strong>{" "}
              <span className="text-green-600 font-medium">
                ${product.price}
              </span>
            </li>
            <li>
              <strong className="text-gray-600">Description:</strong>{" "}
              <span className="text-gray-800">{product.description}</span>
            </li>
            <li>
              <strong className="text-gray-600">Quantity:</strong>{" "}
              <span className="text-gray-800">{product.quantity}</span>
            </li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Return
        </button>
      </div>
    );
  } else {
    content = (
      <p className="text-gray-500 text-center text-lg font-medium">
        No product found.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {content}
    </div>
  );
};

export default ProductDetail;
