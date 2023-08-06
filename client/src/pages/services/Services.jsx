import React from "react";
import "./Services.css";
import { BsInfoCircle } from "react-icons/bs";
import { SiLeaderprice } from "react-icons/si";
import { LiaToolsSolid } from "react-icons/lia";

const Services = (props) => {
  return (
    <>
      <div className="services">
        <div className="header-services">
          <h1>OUR SERVICES</h1>
        </div>
        <div className="main-services">
          <div className="services-content ">
            <BsInfoCircle size={100} />
            <h3>INFORMATION</h3>
            <p>Latest Phone Technology Trends and Information.</p>
          </div>
          <div className="services-content">
            <SiLeaderprice size={100} />
            <h3>PRICES</h3>
            <p>Explore the latest prices and diverse brands of phones.</p>
          </div>
          <div className="services-content">
            <LiaToolsSolid size={100} />
            <h3>TOOLS</h3>
            <p>Phone services, troubleshooting, and usage.</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Services;
