import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../api/productApi";
import { useState, useEffect } from "react";

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: productData, isLoading, error } = useGetProductByIdQuery(id!);
  const [updateProduct] = useUpdateProductMutation();
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
  });

  useEffect(() => {
    if (productData) {
      setFormState({
        name: productData.name || "",
        price: productData.price || "",
        brand: productData.brand || "",
        category: productData.category || "",
      });
    }
  }, [productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateProduct({ id, data: formState });
    alert("Product updated successfully!");
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load product.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <input
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Name"
        className="input"
      />
      <input
        name="price"
        value={formState.price}
        onChange={handleChange}
        placeholder="Price"
        className="input"
      />
      <input
        name="brand"
        value={formState.brand}
        onChange={handleChange}
        placeholder="Brand"
        className="input"
      />
      <input
        name="category"
        value={formState.category}
        onChange={handleChange}
        placeholder="Category"
        className="input"
      />
      <button type="submit" className="btn">
        Update
      </button>
    </form>
  );
};
export default ProductEdit;
