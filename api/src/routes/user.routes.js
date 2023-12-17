import { Router } from "express";
import { createUser,getUsers,getUser,checkEmail } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignup.js";

const router = Router();

router.post("/", [verifyToken, isAdmin, checkExistingUser], createUser);

router.get("/users", getUsers);
router.get("/:userId", getUser);
router.get("/check-email/:email", checkEmail);
export default router;
