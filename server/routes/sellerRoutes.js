const SellerController = require("../controllers/sellerController");

module.exports = (app) => {
  app.post("/api/sellers", SellerController.createSeller);
  app.get("/api/sellersall", SellerController.getAllSellers);
  app.get("/api/sellers", SellerController.getSellers);
  app.get("/api/sellers/:id", SellerController.getSellerById);
  app.put("/api/sellers/:id", SellerController.updateSeller);
  app.delete("/api/sellers/:id", SellerController.deleteSeller);
};
