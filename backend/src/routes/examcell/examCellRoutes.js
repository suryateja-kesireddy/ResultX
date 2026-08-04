const express = require("express");

const examCellController = require("../../controllers/examcell/examCellController");
const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("EXAM_CELL"),
  examCellController.getExamCellProfile
);

module.exports = router;