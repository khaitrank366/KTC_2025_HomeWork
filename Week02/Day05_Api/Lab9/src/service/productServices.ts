import axiosClient from "../api/axiosClient";
import type { Product } from "../types/Product.types";

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  data: Omit<Product, "id">
): Promise<Product> => {
  const response = await axiosClient.post<Product>("/products", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<Product>
): Promise<Product> => {
  const response = await axiosClient.put<Product>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (
    id: string,
): Promise<void> => {
    await axiosClient.delete<Product>(`/products/${id}`);
    
}