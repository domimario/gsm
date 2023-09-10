import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Message.css";
import Swal from "sweetalert2";

const Message = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "You must be sign-in to do that",
      showDenyButton: true,
      confirmButtonText: "Sing In/Register",
      denyButtonText: `Go Back`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        signin();
      } else if (result.isDenied) {
        gohome();
      }
    });
  }, []);

  function signin() {
    navigate("/signin");
  }

  function gohome() {
    navigate("/");
  }

  return <div className="warning-container"></div>;
};

export default Message;
