import pdfPoppler from "pdf-poppler";
import path from "path";
import fs from "fs";

export async function convertPDFToImages(pdfPath) {
  const outputDir = "uploads/slides";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: "slide",
    page: null,
  };

  await pdfPoppler.convert(pdfPath, options);

  const files = fs
    .readdirSync(outputDir)
    .filter((file) => file.endsWith(".png"))
    .map((file) => `/uploads/slides/${file}`);

  return files;
}
