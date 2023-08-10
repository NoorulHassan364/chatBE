const express = require("express");
const ChatController = require("../controllers/ChatController");

const router = express.Router();

router.post("/", ChatController.createChat);

// Find chat users
router.get("/:userId", ChatController.userChats);

// Find specific chat for specific user
router.get("/find/:firstId/:secondId", ChatController.findChat);

module.exports = router;
