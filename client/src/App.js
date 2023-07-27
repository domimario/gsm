import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

import ListSeller from "./pages/sellers/ListSeller";
import ListBrand from "./pages/brands/ListBrand";
import ListModel from "./pages/models/ListModel";
import ListMobile from "./pages/mobiles/ListMobile";

import AddSeller from "./pages/sellers/AddSeller";
import EditSeller from "./pages/sellers/EditSeller";
import DetailsSeller from "./pages/sellers/DetailsSeller";

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
            <Route element={<DetailsSeller />} path={"/sellers/:id"} />
            <Route element={<ListBrand />} path={"/brands"} />
            <Route element={<ListModel />} path={"/models"} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
