const MobileController = require("../controllers/mobileController");

module.exports = (app) => {
  app.post("/api/mobiles", MobileController.createMobile);
  app.get("/api/mobiles", MobileController.getAllMobiles);
  app.get("/api/mobiles/:id", MobileController.getMobileById);
  app.put("/api/mobiles/:id", MobileController.updateMobile);
  app.delete("/api/mobiles/:id", MobileController.deleteMobile)
};
