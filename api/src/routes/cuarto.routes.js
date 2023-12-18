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


router.post("/create", [verifyToken, isArrendador], createCuarto);

export default router;
