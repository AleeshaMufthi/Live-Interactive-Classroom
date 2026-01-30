import express from "express";
import multer from "multer";
import { uploadSlides } from "../controller/uploadController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload/:code", upload.single("file"), uploadSlides);

export default router;
