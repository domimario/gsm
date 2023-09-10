import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import TitleImg from "../../assets/title.svg";
import Text from "../../components/Text/Text";
import SamsungIcon from "../../assets/samsung.png";
import AppleIcon from "../../assets/Apple-Logo.png";
import XiaomiIcon from "../../assets/xiaomi.png";
import GoogleIcon from "../../assets/google-removebg-preview.png";
import AboutIcon from "../../assets/about.svg";

import "./Home.css";

const Home = (props) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };
  return (
    <>
      <div className="container head " id="home-section">
        <div className="row">
          <div className=" col-lg-6 title">
            <div>
              <Text
                text={"Better Choice"}
                family={"open-sans"}
                lineheight={"l27"}
                size={"s60"}
                weight={"bold"}
                color={"black"}
              />
              <br />
              <Text
                text={"With us you find what you want"}
                family={"open-sans"}
                lineheight={"l24"}
                size={"s22"}
                weight={"bold"}
                color={"black"}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <img src={TitleImg} alt="" className="titleSVG" />
          </div>
        </div>
      </div>

      <div className="container brands-logo">
        <div className="row brands">
          <div className="col-lg-3 icons-c">
            <img src={SamsungIcon} alt="" className="icons" />
          </div>
          <div className="col-lg-3 icons-c">
            <img src={XiaomiIcon} alt="" className="icons" id="xiaomi" />{" "}
          </div>
          <div className="col-lg-3 icons-c">
            <img src={AppleIcon} alt="" className="icons" id="apple" />
          </div>
          <div className="col-lg-3 icons-c">
            <img src={GoogleIcon} alt="" className="icons" id="google" />
          </div>
        </div>
      </div>

      <div className="container about-us" id="about-section">
        <div className="about-title">
          <Text
            text={"ABOUT US"}
            family={"open-sans"}
            lineheight={"l24"}
            size={"s40"}
            weight={"bold"}
            color={"blue"}
          />
        </div>
        <div className="row content-about">
          <div className="col-lg-6 ">
            <Text
              text={
                "At Our Mobile Marketplace, we bring you a one-stop platform to explore a wide range of phone stores and discover the latest mobile models from top brands. Whether you are a tech enthusiast or simply looking for your dream phone, we've got you covered."
              }
              family={"open-sans"}
              lineheight={"l27"}
              size={"s22"}
              weight={"regular"}
              color={"black"}
            />

            <button
              type="button"
              onClick={handleLearnMore}
              className="about-learn btn btn-outline-info"
            >
              <Text
                text={"Learn More"}
                family={"open-sans"}
                lineheight={"l27"}
                size={"s22"}
                weight={"regular"}
                color={"black"}
              />
            </button>
          </div>
          <div className="col-lg-6">
            <img src={AboutIcon} alt="" className="titleSVG" />
          </div>
        </div>
      </div>

      <div className="container services">
        <div className="service-title">
          <Text
            text={"SERVICE"}
            family={"open-sans"}
            lineheight={"l27"}
            size={"s40"}
            weight={"bold"}
            color={"blue"}
          />
          <br />
          <Text
            text={"With us you find what you really need , about mobile phone"}
            family={"open-sans"}
            lineheight={"l24"}
            size={"s20"}
            weight={"regular"}
            color={"gray"}
          />
        </div>
        <div className="row ">
          <div className=" col-xl-3 col-md-6 d-flex boom ">
            <div className="icon-box">
              <div className="icon">
                <i class="fa-solid fa-gem" style={{ color: "#004aad" }}></i>
              </div>
              <div>
                <Text
                  text={"Brands"}
                  family={"open-sans"}
                  lineheight={"l27"}
                  size={"s27"}
                  weight={"bold"}
                  color={"black"}
                />
              </div>
              <div>
                <Text
                  text={"Top all arownd the world"}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s18"}
                  weight={"regular"}
                  color={"gray"}
                />
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-md-6 d-flex boom">
            <div className="icon-box">
              <div className="icon">
                <i
                  class="fa-solid fa-copyright"
                  style={{ color: "#004aad" }}
                ></i>
              </div>
              <div>
                <Text
                  text={"Sellers"}
                  family={"open-sans"}
                  lineheight={"l27"}
                  size={"s27"}
                  weight={"bold"}
                  color={"black"}
                />
              </div>
              <div>
                <Text
                  text={"Certified sellers "}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s18"}
                  weight={"regular"}
                  color={"gray"}
                />
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-md-6 d-flex boom">
            <div className="icon-box">
              <div className="icon">
                <i class="fa-solid fa-list" style={{ color: "#004aad" }}></i>
              </div>
              <div>
                <Text
                  text={"Models"}
                  family={"open-sans"}
                  lineheight={"l27"}
                  size={"s27"}
                  weight={"bold"}
                  color={"black"}
                />
              </div>
              <div>
                <Text
                  text={"The latest models"}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s18"}
                  weight={"regular"}
                  color={"gray"}
                />
              </div>
            </div>
          </div>
          <div className=" col-xl-3 col-md-6 d-flex boom">
            <div className="icon-box">
              <div>
                <i
                  class="fa-solid fa-sack-dollar"
                  style={{ color: " #004aad" }}
                ></i>
                <Text
                  text={"Price"}
                  family={"open-sans"}
                  lineheight={"l27"}
                  size={"s27"}
                  weight={"bold"}
                  color={"black"}
                />
              </div>
              <div>
                <Text
                  text={"Pay-as-you-use "}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s18"}
                  weight={"regular"}
                  color={"gray"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
