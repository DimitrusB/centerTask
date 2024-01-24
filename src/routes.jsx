import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/main";



export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
