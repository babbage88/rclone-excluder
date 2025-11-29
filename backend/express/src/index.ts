import express from "express";
import path from "path";
import cors from "cors";


import { scanDirectory } from "./fileScanner.js";

const app = express();
const PORT = process.env.PORT || 4000;

function validateAbsolutePath(input: string): string {
  if (!path.isAbsolute(input)) {
    throw new Error("Path must be absolute");
  }
  return input;
}
app.use(cors());
app.get("/api/scan", async (req, res) => {
  try {
    console.log("scan called, query:", req.query);
    const rawPath = req.query.path as string;
    const root = validateAbsolutePath(rawPath);

    const tree = await scanDirectory(root);

    res.json(tree);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`ESM backend running on http://localhost:${PORT}`);
});
