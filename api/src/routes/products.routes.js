import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProductById,
  deleteProductById,
  getProductById,
} from "../controllers/products.controller.js";
import { verifyToken, isArrendador, isAlumno, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getProducts);

router.get("/:productId", getProductById);

router.post("/", [verifyToken, isArrendador], createProduct);

router.put("/:productId", [verifyToken, isArrendador], updateProductById);

router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;
