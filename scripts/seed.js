require("dotenv").config();
const mongoose = require("mongoose");
const Resume = require("../models/Resume");

const data = {
  personalInfo: {
    fullName: "Pankaj Priyanshu",
    email: "ppriyanshu015@gmail.com",
    phone: "+91 7905775991",
    location: "Varanasi, India",
    professionalTitle: "Software Application Development Student",
    summary: "Motivated software application development student with a strong foundation in C, C++, Python, HTML, CSS, and R. Currently pursuing an M.Voc in Software Application Development at Cochin University of Science and Technology. Passionate about mobile application development using Flutter and eager to contribute to innovative software projects while continuously improving technical skills."
  },
  education: [
    { qualification: "Master of Vocation (Software Application Development)", institution: "Cochin University of Science and Technology", period: "Expected 2028", result: "Currently pursuing" },
    { qualification: "Bachelor of Computer Applications (BCA)", institution: "Amity University", period: "2020 – 2023", result: "CGPA: 7.54" }
  ],
  technicalSkills: ["C", "C++", "Python", "HTML", "CSS", "R"],
  projects: [],
  certifications: []
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Resume.deleteMany({});
    await Resume.create(data);
    console.log("Resume record inserted into resumeDB.");
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}
seed();