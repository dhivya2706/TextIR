import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import Image from "../models/Image.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const runPython = (script, args) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", [script, ...args]);

    py.stdout.on("data", (data) => console.log(data.toString()));
    py.stderr.on("data", (data) => console.error(data.toString()));

    py.on("close", (code) => {
      if (code === 0) resolve();
      else reject("Python error");
    });
  });
};
router.post("/super-resolution", upload.single("image"), async (req, res) => {
  try {
    const input = req.file.path;
    const output = `outputs/sr-${Date.now()}.png`;

    await runPython("model/super_resolution.py", [
      input,
      output,
      req.body.description || ""
    ]);

    const saved = await Image.create({
      image: input,
      updatedImage: output,
      type: "super-resolution",
      description: req.body.description,
    });

    res.json({ image: output, data: saved });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.post("/colourization", upload.single("image"), async (req, res) => {
  try {
    const input = req.file.path;
    const output = `outputs/color-${Date.now()}.png`;

    await runPython("model/colourization.py", [
      input,
      output,
      req.body.description || ""
    ]);

    const saved = await Image.create({
      image: input,
      updatedImage: output,
      type: "colourization",
      description: req.body.description,
    });

    res.json({ image: output, data: saved });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.post("/degrading", upload.single("image"), async (req, res) => {
  try {
    const input = req.file.path;
    const output = `outputs/deg-${Date.now()}.png`;

    await runPython("model/degrading.py", [
      input,
      output
    ]);

    const saved = await Image.create({
      image: input,
      updatedImage: output,
      type: "degrading",
      description: req.body.description,
    });

    res.json({ image: output, data: saved });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});
router.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/update/:id", upload.single("updatedImage"), async (req, res) => {
  try {
    const updated = await Image.findByIdAndUpdate(
      req.params.id,
      { updatedImage: req.file.path },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;