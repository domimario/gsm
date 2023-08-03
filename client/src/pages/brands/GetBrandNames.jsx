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
        `http://localhost:8000/api/models/${modelsIds}`
      );
      setModels(response.data);
    } catch (error) {}
  };

  return <>{model.modelName}</>;
};
export default GetBrandNames;
