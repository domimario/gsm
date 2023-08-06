import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Navbar
import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

// SideBar
import SideBar from "./layout/sidebar/SideBar";

// Selller
import ListSeller from "./pages/sellers/ListSeller/ListSeller";
import AddSeller from "./pages/sellers/AddSeller/AddSeller";
import EditSeller from "./pages/sellers/EditSeller/EditSeller";
import SellerBox from "./pages/sellers/DetailsSeller/SellerBox";

// Brand
import ListBrand from "./pages/brands/ListBrand/ListBrand";
import EditBrand from "./pages/brands/EditBrand/EditBrand";
import AddBrand from "./pages/brands/AddBrand/AddBrand";
import DetailsBrand from "./pages/brands/DetailsBrand/DetailsBrand";

// Models
import ListModel from "./pages/models/ListModel/ListModel";
import AddModel from "./pages/models/AddModel/AddModel";
import EditModel from "./pages/models/EditModel/EditModel";

// Mobiles
import ListMobile from "./pages/mobiles/ListMobile/ListMobile";
import AddMobile from "./pages/mobiles/AddMobile/AddMobile";
import EditMobile from "./pages/mobiles/EditMobile/EditMobile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="main">
          <div className="side-main">
            {" "}
            <SideBar />
          </div>

          <main className="main-content">
            {" "}
            <Routes>
              <Route element={<Navigate to={"/"} />} path={"*"} />
              <Route element={<Home />} path={"/"} />
              <Route element={<About />} path={"/about"} />
              <Route element={<Contact />} path={"/contact"} />

              {/* Seller Routes  */}
              <Route element={<ListSeller />} path={"/sellers"} />
              <Route element={<AddSeller />} path={"/sellers/new"} />
              <Route element={<EditSeller />} path={"/sellers/edit/:id"} />
              <Route element={<SellerBox />} path={"/sellers/:id"} />

              {/* Brand Routes  */}
              <Route element={<ListBrand />} path={"/brands"} />
              <Route element={<AddBrand />} path={"/brands/new"} />
              <Route element={<EditBrand />} path={"/brands/edit/:id"} />
              <Route element={<DetailsBrand />} path={"/brands/:id"} />

              {/* Model Routes  */}
              <Route element={<ListModel />} path={"/models"} />
              <Route element={<AddModel />} path={"/models/new"} />
              <Route element={<EditModel />} path={"/models/edit/:id"} />

              {/* Mobiles Routes  */}
              <Route element={<ListMobile />} path={"/mobiles"} />
              <Route element={<AddMobile />} path={"/mobiles/new"} />
              <Route element={<EditMobile />} path={"mobiles/edit/:id"} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
