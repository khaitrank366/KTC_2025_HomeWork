// src/api/productApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProduct } from "../types/Product.type";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://687076877ca4d06b34b6db29.mockapi.io/api/v1/",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "products-lab",
      providesTags: ["Products"],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `products-lab/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),
    addProduct: builder.mutation<IProduct, Partial<IProduct>>({
      query: (body) => ({
        url: "products-lab",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation<
      IProduct,
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `products-lab/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products-lab/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
