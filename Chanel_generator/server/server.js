const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { InferenceClient } = require("@huggingface/inference");
const app = express();
app.use(cors());
app.use(express.json());
const hf = new InferenceClient(process.env.HF_TOKEN);
app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }
    const imageBlob = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-dev",
      inputs: prompt
    });
    const buffer = Buffer.from(await imageBlob.arrayBuffer());
    const image = `data:image/png;base64,${buffer.toString("base64")}`;
    res.json({
      image: image
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate image"
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});