import React from "react";
import Construct from "./banerconctruction.png";
import "./Contact.css";
import Text from "../../components/Text/Text";

const Contact = (props) => {
  return (
    <>
      <div className="container">
        <div className="contact-title">
          <Text
            text={"CONTACT"}
            family={"open-sans"}
            lineheight={"l27"}
            size={"s40"}
            weight={"bold"}
            color={"blue"}
          />
          <br />
          <Text
            text={"Have any questions ? We'd love to hear from you."}
            family={"open-sans"}
            lineheight={"l24"}
            size={"s20"}
            weight={"regular"}
            color={"gray"}
          />
        </div>
        <div className="row">
          <div className="col-lg-5 d-flex align-items-stretch">
            <div className="info">
              <div className="address">
                <i
                  class="fa-solid fa-location-crosshairs fa-xl"
                  style={{ color: "#0049ae" }}
                ></i>
                <div>
                  <Text
                    text={"Location"}
                    family={"open-sans"}
                    lineheight={"l27"}
                    size={"s27"}
                    weight={"bold"}
                    color={"blue"}
                  />
                  <br />
                  <Text
                    text={"Location"}
                    family={"open-sans"}
                    lineheight={"l24"}
                    size={"s20"}
                    weight={"regular"}
                    color={"gray"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7"></div>
        </div>
      </div>
    </>
  );
};
export default Contact;
