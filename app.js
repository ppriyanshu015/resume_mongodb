require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Resume = require("./models/Resume");

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => console.log(`CV running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

app.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne().lean();
    if (!resume) return res.status(404).render("empty", {
      pageTitle: "Resume not found",
      message: "No resume record found. Run npm run seed first."
    });
    res.render("resume", { pageTitle: `${resume.personalInfo.fullName} | CV`, resume });
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to load CV. Check MongoDB and server logs.");
  }
});

app.use((req, res) => res.status(404).render("empty", {
  pageTitle: "Page not found", message: "The requested page does not exist."
}));