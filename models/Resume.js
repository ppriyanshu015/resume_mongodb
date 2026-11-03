const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    location: String,
    professionalTitle: String,
    summary: String
  },
  education: [{
    qualification: { type: String, required: true },
    institution: { type: String, required: true },
    period: String,
    result: String
  }],
  technicalSkills: [String],
  projects: [{
    title: { type: String, required: true },
    description: String,
    technologies: [String],
    link: String
  }],
  certifications: [{
    name: { type: String, required: true },
    issuer: String,
    date: String,
    credentialUrl: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);