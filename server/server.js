const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
const cors = require("cors");
const ffmpegPath = require("ffmpeg-static");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
dotenv.config();
app.use(cors());
const path = require("path");
const OpenAI = require("openai");
const multer = require("multer");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "temp"); // folder to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage: storage });
async function main(filePath) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: "whisper-1",
  });
  console.log(transcription.text);
  return transcription.text;
}
app.get("/", (req, res) => {
  console.log("someone connected");
  res.json({msg:"some one connected"});
});

app.post("/upload", upload.single("audio"), async (req, res) => {
  const inputFilePath = path.join(__dirname, "temp", req.file.filename);
  const outputFilePath = path.join(__dirname, "audio", `${Date.now()}.mp3`);

  ffmpeg(inputFilePath)
    .output(outputFilePath)
    .on("end", () => {
      (async () => {
        try {
          // Remove temp webm file after conversion
          fs.unlinkSync(inputFilePath);

          // Await the result from the main function
          const text = await main(outputFilePath);
          fs.unlinkSync(outputFilePath);
          console.log(text);
          res.json({ msg: text });
        } catch (error) {
          console.error("Error during processing:", error);
          res.status(500).send("Failed to process the audio.");
        }
      })(); // Immediately invoke the async function
    })
    .on("error", (err) => {
      console.error("Error converting audio:", err);
      res.status(500).send("Failed to convert audio.");
    })
    .run();
});

app.listen(8000, () => console.log("server is started"));
