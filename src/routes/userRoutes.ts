import express from "express";
import { imageUpload } from "../config/multer";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userControllers";

const router = express.Router();

router.post("/", imageUpload.single("img"), createUser);
router.put("/:id", imageUpload.single("img"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router;
