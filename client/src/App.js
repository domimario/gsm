import React from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import ScrollTop from "./components/ScrollTop";

import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";

// Selller
import ListSeller from "./pages/sellers/ListSeller/ListSeller";
import AddSeller from "./pages/sellers/AddSeller/AddSeller";
import EditSeller from "./pages/sellers/EditSeller/EditSeller";

// Brand
import ListBrand from "./pages/brands/ListBrand/ListBrand";
import EditBrand from "./pages/brands/EditBrand/EditBrand";
import AddBrand from "./pages/brands/AddBrand/AddBrand";
import DetailsBrand from "./pages/brands/DetailsBrand/DetailsBrand";

// Models
import ListModel from "./pages/models/ListModel/ListModel";
import AddModel from "./pages/models/AddModel/AddModel";
import EditModel from "./pages/models/EditModel/EditModel";
import DetailsModel from "./pages/models/DetailsModel/DetailsModel";
import DetailsSeller from "./pages/sellers/DetailsSeller/DetailsSeller";
Amplify.configure(awsExports);
function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <BrowserRouter>
          <div className="App">
            <Header />
            <ScrollTop />

            <main className="main-content">
              <Routes>
                <Route element={<Home />} path={"/"} />
                <Route element={<About />} path={"/about"} />
                <Route element={<Contact />} path={"/contact"} />

                <Route element={<ListSeller />} path={"/sellers"} />
                <Route element={<AddSeller />} path={"/sellers/new"} />
                <Route element={<EditSeller />} path={"/sellers/edit/:id"} />
                <Route element={<DetailsSeller />} path={"/sellers/:id"} />

                <Route element={<ListBrand />} path={"/brands"} />
                <Route element={<AddBrand />} path={"/brands/new"} />
                <Route element={<EditBrand />} path={"/brands/edit/:id"} />
                <Route element={<DetailsBrand />} path={"/brands/:id"} />

                <Route element={<ListModel />} path={"/models"} />
                <Route element={<AddModel />} path={"/models/new"} />
                <Route element={<EditModel />} path={"/models/edit/:id"} />
                <Route element={<DetailsModel />} path={"/models/:id"} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      )}
    </Authenticator>
  );
}

export default App;
