import React, { useState, useEffect } from "react";
import axios from "axios";
const GetBrandNames = ({ modelsIds }) => {
  const [model, setModels] = useState([]);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const response = await axios.get(
        `https://ii8hbtn459.execute-api.eu-west-2.amazonaws.com/dev/model/${modelsIds}`
      );
      setModels(response.data);
    } catch (error) {}
  };

  return <>{model.modelName}</>;
};
export default GetBrandNames;
