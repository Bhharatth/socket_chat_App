import express from "express";
import { createNewMessages, getMessages } from "../controllers/messages.js";
const router = express.Router();

//create
router.post("/", createNewMessages);

//get
router.get("/:conversationId", getMessages);

export default router;