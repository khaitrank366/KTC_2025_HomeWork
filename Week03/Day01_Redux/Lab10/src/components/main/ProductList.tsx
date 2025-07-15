import { useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../api/productApi";

const ProductList = () => {
  const navigate = useNavigate();
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure to delete?")) {
      await deleteProduct(id);
      alert("Deleted successfully");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product list.</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <button
          onClick={() => navigate("/products-lab/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((prod) => (
            <tr key={prod.objectID} className="border-t">
              <td>{prod.objectID}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.brand}</td>
              <td>{prod.category}</td>
              <td>
                <button
                  onClick={() => navigate(`/products-lab/${prod.objectID}`)}
                  className="text-blue-500 mr-2"
                >
                  Detail
                </button>
                <button
                  onClick={() =>
                    navigate(`/products-lab/${prod.objectID}/edit`)
                  }
                  className="text-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod.objectID)}
                  className="text-red-600"
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
};
export default ProductList;
