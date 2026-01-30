import express from "express";
import { createSession, joinSession, getSession } from "../controller/sessionController.js";


const router = express.Router();

router.post("/session/create", createSession);
router.post("/session/join", joinSession);
router.get("/session/:code", getSession);

export default router;
