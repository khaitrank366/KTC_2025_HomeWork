import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../api/productApi";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  let content: React.ReactNode;

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center h-64">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600" />
      </div>
    );
  } else if (isError || !product) {
    content = (
      <p className="text-red-500 text-center text-lg font-medium bg-red-100 p-4 rounded-md">
        Failed to load product: {(error as any)?.message || "Unknown error"}
      </p>
    );
  } else {
    content = (
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product Detail
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <ul className="flex-1 space-y-3">
            <li>
              <strong className="text-gray-600">ID:</strong>{" "}
              <span className="text-gray-800">{product.objectID}</span>
            </li>
            <li>
              <strong className="text-gray-600">Name:</strong>{" "}
              <span className="text-gray-800">{product.name}</span>
            </li>
            <li>
              <strong className="text-gray-600">Price:</strong>{" "}
              <span className="text-green-600 font-medium">
                {product.price}
              </span>
            </li>
            <li>
              <strong className="text-gray-600">Brand:</strong>{" "}
              <span className="text-gray-800">{product.brand}</span>
            </li>
            <li>
              <strong className="text-gray-600">Category:</strong>{" "}
              <span className="text-gray-800">{product.category}</span>
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
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {content}
    </div>
  );
};

export default ProductDetail;
