import React from "react";
import "./About.css";
import Text from "../../components/Text/Text";
import AboutBg from "../../assets/allphone.jpg";

const About = () => {
  return (
    <>
      <div className="aboutbg">
        <div className="background-image" style={{ backgroundImage: `url(${AboutBg})` }}></div>
        <div className="text-white">
          <div className="centered">
            <Text
              text={"ABOUT GSM ALBANIA"}
              family={"open-sans"}
              lineheight={"l27"}
              size={"s50"}
              weight={"bold"}
              color={"blue"}
            />
            <br />
            <Text
              text={
                "At Our Mobile Marketplace, we bring you a one-stop platform to explore a wide range of phone stores and discover the latest mobile models from top brands. Whether you are a tech enthusiast or simply looking for your dream phone, we've got you covered."
              }
              family={"open-sans"}
              lineheight={"l27"}
              size={"s22"}
              weight={"bold"}
              color={"blue"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
