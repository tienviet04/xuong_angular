import { Router } from "express";
import ProductsController from "../controllers/products";

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/search', productsController.search)
productsRouter.get("/", productsController.getAllProducts);
productsRouter.get("/:id", productsController.getProductDetail);
productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:id", productsController.updateProduct);
productsRouter.delete("/:id", productsController.deleteProduct);

export default productsRouter;
