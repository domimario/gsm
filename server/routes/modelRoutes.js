const ModelController = require("../controllers/modelController");

module.exports = (app) => {
  app.post("/api/models", ModelController.createModel);
  app.get("/api/modelsall", ModelController.getAllModels);
  app.get("/api/models", ModelController.getModels);
  app.get("/api/models/:id", ModelController.getModelById);
  app.put("/api/models/:id", ModelController.updateModel);
  app.delete("/api/models/:id", ModelController.deleteModel);
};
