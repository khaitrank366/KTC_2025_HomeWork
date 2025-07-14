import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "../main/product/ProductList";
import ProductAdd from '../main/product/ProductAdd';
import ProductDetail from '../main/product/ProductDetail';
import ProductEdit from '../main/product/ProductEdit';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />
        <Route
          path="/products/add"
          element={<ProductAdd />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetail />}
        />
        <Route
          path="/products/:id/edit"
          element={<ProductEdit />}
        />
      </Routes>
    </BrowserRouter>
  );
}
