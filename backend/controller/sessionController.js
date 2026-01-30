import Session from "../models/sessionModel.js";
import { generateSessionCode } from "../utils/generateCode.js";

export const createSession = async (req, res) => {
  const code = generateSessionCode();

  const session = await Session.create({
    code,
    slides: [],
    activities: [],
    responses: [],
  });

  res.json({ code });
};

export const joinSession = async (req, res) => {
  const session = await Session.findOne({ code: req.body.code });

  if (!session) return res.status(404).json({ error: "Invalid code" });

  res.json(session);
};

export const getSession = async (req, res) => {
  const session = await Session.findOne({ code: req.params.code });
  res.json(session);
};