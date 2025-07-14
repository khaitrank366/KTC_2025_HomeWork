import axiosClient from "../api/axiosClient";
import type { IProduct } from "../types/Product.types";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await axiosClient.get<IProduct[]>("/products");
  return response.data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await axiosClient.get<IProduct>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  data: Omit<IProduct, "id">
): Promise<IProduct> => {
  const response = await axiosClient.post<IProduct>("/products", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct> => {
  const response = await axiosClient.put<IProduct>(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axiosClient.delete<IProduct>(`/products/${id}`);
};
