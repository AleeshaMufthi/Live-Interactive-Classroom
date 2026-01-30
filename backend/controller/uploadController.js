import fs from "fs-extra";
import { convert } from "pdf-poppler";
import Session from "../models/sessionModel.js";

export const uploadSlides = async (req, res) => {
  try {
    const code = req.params.code;
    const pdfPath = req.file.path;
    const outputDir = `slides/${code}`;

    await fs.ensureDir(outputDir);

    await convert(pdfPath, {
      format: "png",
      out_dir: outputDir,
      out_prefix: "slide",
      page: null,
    });

    const slideFiles = fs.readdirSync(outputDir)
      .filter(f => f.endsWith(".png"))
      .sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));

    const slidePaths = slideFiles.map(f => `/slides/${code}/${f}`);

    await Session.updateOne({ code }, { slides: slidePaths });

    res.json({ success: true, slides: slidePaths });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Slide conversion failed" });
  }
};
