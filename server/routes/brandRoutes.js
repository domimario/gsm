const BrandController = require("../controllers/brandController");

module.exports = (app) => {
  app.post("/api/brands", BrandController.createBrand);
  app.get("/api/brandsall", BrandController.getAllBrands);
  app.get("/api/brands", BrandController.getBrands);
  app.get("/api/brands/:id", BrandController.getBrandById);
  app.put("/api/brands/:id", BrandController.updateBrand);
  app.delete("/api/brands/:id", BrandController.deleteBrand);
};
