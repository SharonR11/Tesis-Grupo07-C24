import { Router } from "express";
import {
  getCuartos,
  createCuarto,
//   updateProductById,
//   deleteProductById,
//   getProductById,
} from "../controllers/cuarto.controller.js";
import { verifyToken, isArrendador, isAlumno, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

router.get("/", getCuartos);

// router.get("/:productId", getProductById);

router.post("/", [verifyToken, isArrendador], createCuarto);

// router.put("/:productId", [verifyToken, isArrendador], updateProductById);

// router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;
