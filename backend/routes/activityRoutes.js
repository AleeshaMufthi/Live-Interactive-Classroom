import express from "express";
import { addActivity } from "../controller/activityController.js";

const router = express.Router();

router.post("/activity/add", addActivity);

export default router;