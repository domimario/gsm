import React from "react";
import "./Footer.css";
import Text from "../../components/Text/Text";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <>
      {/* <div className="footer-news">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <Text
                text={"Join our news letter"}
                family={"open-sans"}
                lineheight={"l24"}
                size={"s24"}
                weight={"bold"}
                color={"blue"}
              />
              <Text
                text={"Subscribe our newsletter to stay updated every moment. "}
                family={"open-sans"}
                lineheight={"l22"}
                size={"s18"}
                weight={"regular"}
                color={"gray"}
              />
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container footer">
        <div className="row">
          <div className="col-lg-3 col-md-6 footer-contact">
            <Link to={"/"}>
              <Text
                text={"GSM Albania"}
                family={"open-sans"}
                lineheight={"l24"}
                size={"s40"}
                weight={"bold"}
                color={"blue"}
              />
            </Link>

            <br />
            <Text
              text={"St.Trenit"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s18"}
              weight={"regular"}
              color={"gray"}
            />
            <Text
              text={"Tirane , 1001"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s18"}
              weight={"regular"}
              color={"gray"}
            />
            <Text
              text={"Albania"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s18"}
              weight={"regular"}
              color={"gray"}
            />
            <br />
            <Text
              text={"Phone : +355677289201"}
              family={"open-sans"}
              lineheight={"l20"}
              size={"s16"}
              weight={"bold"}
              color={"black"}
            />
            <Text
              text={"Email : gsm@albania.com"}
              family={"open-sans"}
              lineheight={"l20"}
              size={"s16"}
              weight={"bold"}
              color={"black"}
            />
          </div>
          <div className="col-lg-3 col-md-6 footer-links">
            <Text
              text={"Useful links"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s24"}
              weight={"regular"}
              color={"blue"}
            />
            <br />
            <ul className="links">
              <li>
                <Link to={"home-section"} smooth={true} duration={500}>
                  <Text
                    text={"Home"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s18"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </Link>
              </li>

              <li>
                <Link to={"about-section"} smooth={true} duration={500}>
                  <Text
                    text={"About Us"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s18"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </Link>
              </li>
              <li>
                <Link to={"/contact"}>
                  <Text
                    text={"Contact Us"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s18"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footer-links">
            <Text
              text={"Our Service"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s24"}
              weight={"regular"}
              color={"blue"}
            />
            <br />
            <ul className="links">
              <li>
                <Link to={"/brands"}>
                  {" "}
                  <Text
                    text={"Brands"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s18"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </Link>
              </li>
              <li>
                <Link to={"/models"}>
                  {" "}
                  <Text
                    text={"Models"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s18"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </Link>
              </li>
              <li>
                <Link to={"/sellers"}>
                  {" "}
                  <Text
                    text={"Sellers"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s18"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footer-links">
            <Text
              text={"Our Social Network"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s24"}
              weight={"regular"}
              color={"blue"}
            />
            <br />
            <Text
              text={"Get social with us"}
              family={"open-sans"}
              lineheight={"l24"}
              size={"s18"}
              weight={"regular"}
              color={"gray"}
            />
            <div className="socila-links mt-3"></div>
          </div>
        </div>
      </div>

      <div className="container footer-copy">
        <Text
          className="centered-text"
          text={"© Copyright GSM ALBANIA. All rights reserved"}
          family={"open-sans"}
          lineheight={"l22"}
          size={"s16"}
          weight={"regular"}
          color={"white"}
        />
      </div>
    </>
  );
};
export default Footer;
