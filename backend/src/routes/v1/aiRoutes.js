const express = require("express");

const {
  generateProject,
} = require("../../controllers/aiController");

const router = express.Router();

router.post(
  "/project-builder",
  generateProject
);

module.exports = router;