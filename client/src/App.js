import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

import ListSeller from "./pages/sellers/ListSeller/ListSeller";
import ListBrand from "./pages/brands/ListBrand";
import ListModel from "./pages/models/ListModel";
import ListMobile from "./pages/mobiles/ListMobile";

import AddSeller from "./pages/sellers/AddSeller/AddSeller";
import EditSeller from "./pages/sellers/EditSeller/EditSeller";

import SellerBox from "./pages/sellers/DetailsSeller/SellerBox";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          {" "}
          <Routes>
            <Route element={<Home />} path={"/"} />
            <Route element={<About />} path={"/about"} />
            <Route element={<Contact />} path={"/contact"} />
            <Route element={<ListSeller />} path={"/sellers"} />
            <Route element={<ListMobile />} path={"/mobiles"} />
            <Route element={<AddSeller />} path={"/sellers/new"} />
            <Route element={<EditSeller />} path={"/edit/:id"} />
            <Route element={<SellerBox />} path={"/sellers/:id"} />
            <Route element={<ListBrand />} path={"/brands"} />
            <Route element={<ListModel />} path={"/models"} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
