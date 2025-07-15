import { useAddProductMutation } from "../../api/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
  });
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProduct(formState).unwrap();
    alert("Product added successfully!");
    navigate("/");
  };

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
        Add Product
      </button>
    </form>
  );
};
export default AddProduct;
