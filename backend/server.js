const express = require("express");
const multer = require("multer");
const CloudConvert = require("cloudconvert");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "https://anytools-ruby.vercel.app" }));

const upload = multer({ dest: "uploads/" });

const cloudConvert = new CloudConvert(process.env.CLOUD_CONVERT_API_KEY);

app.post("/convert/docx-to-pdf", upload.single("file"), async (req, res) => {
  try {
    const inputFilePath = req.file.path;

    // 1. Create a job with all tasks
    const job = await cloudConvert.jobs.create({
      tasks: {
        "import-my-file": {
          operation: "import/upload",
        },
        "convert-my-file": {
          operation: "convert",
          input: "import-my-file",
          output_format: "pdf",
        },
        "export-my-file": {
          operation: "export/url",
          input: "convert-my-file",
        },
      },
    });

    // 2. Upload file to import-my-file task
    const importTask = job.tasks.find(t => t.name === "import-my-file");

    await cloudConvert.tasks.upload(
      importTask,
      fs.createReadStream(inputFilePath),
      req.file.originalname
    );

    // 3. Wait for the full job to complete
    const completedJob = await cloudConvert.jobs.wait(job.id);

    // 4. Find the export task result
    const exportTask = completedJob.tasks.find(
      t => t.name === "export-my-file" && t.status === "finished"
    );

    if (!exportTask || !exportTask.result || !exportTask.result.files.length) {
      return res.status(500).json({ success: false, message: "Export failed" });
    }

    const fileUrl = exportTask.result.files[0].url;

    // 5. Respond with URL
    res.json({ success: true, url: fileUrl });

    // 6. Clean up uploaded file
    fs.unlinkSync(inputFilePath);
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/download", async (req, res) => {
  try {
    const fileUrl = req.query.url;

    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader("Content-Disposition", 'attachment; filename="converted.pdf"');
    response.data.pipe(res);
  } catch (err) {
    console.error("Download error:", err.message);
    res.status(500).send("Failed to download file.");
  }
});


app.get("/credits", async (req,res)=> {
   try {
    const user = await cloudConvert.users.me();
    res.status(200).json({credits : user.credits});
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({message: "Internal server error"})
  }
})
const port = process.env.PORT
app.listen(port, () => {
  console.log("Server started on http://localhost:3000");
});
