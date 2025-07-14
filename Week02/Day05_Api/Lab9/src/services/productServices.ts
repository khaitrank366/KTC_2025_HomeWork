import axiosClient from "../api/axiosClient";
import type { IProduct } from "../types/Product.type";

export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await axiosClient.get<IProduct[]>("/products-lab");
  return response.data;
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await axiosClient.get<IProduct>(`/products-lab/${id}`);
  return response.data;
};

export const createProduct = async (
  data: Omit<IProduct, "objectID">
): Promise<IProduct> => {
  const response = await axiosClient.post<IProduct>("/products-lab", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<Omit<IProduct, "objectID">>
): Promise<IProduct> => {
  const response = await axiosClient.put<IProduct>(`/products-lab/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axiosClient.delete(`/products-lab/${id}`);
};
