import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../api";
// import { Auth } from "aws-amplify";
const GetBrandNames = ({ modelsIds }) => {
  const [model, setModels] = useState([]);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    // const user = await Auth.currentAuthenticatedUser();
    // const token = user.signInUserSession.idToken.jwtToken;
    try {
      const response = await axios.get(
        `${BASE_URL}/model/${modelsIds}`
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        // }
      );
      setModels(response.data);
    } catch (error) {}
  };

  return <>{model.modelName}</>;
};
export default GetBrandNames;
