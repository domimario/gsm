import React, { useState, useEffect } from "react";
import axios from "axios";

const GetModelsName = ({ modelId }) => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const res = await axios.get(
        `https://ii8hbtn459.execute-api.eu-west-2.amazonaws.com/dev/model/${modelId}`
      );
      setModels(res.data);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  return <>{models.model}</>;
};

export default GetModelsName;
