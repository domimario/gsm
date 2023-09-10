import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api";
// import { Auth } from "aws-amplify";

const GetModelsName = ({ modelId }) => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    // const user = await Auth.currentAuthenticatedUser();
    // const token = user.signInUserSession.idToken.jwtToken;
    try {
      const res = await axios.get(
        `${BASE_URL}/model/${modelId}`,
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        // }
      );
      setModels(res.data);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  return <>{models.model}</>;
};

export default GetModelsName;
