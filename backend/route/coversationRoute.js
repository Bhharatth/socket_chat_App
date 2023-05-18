import express from "express";
const router = express.Router();
import { getUserConversation} from "../controllers/convesation.js";
import {  getconversationOfTwoUser } from "../controllers/convesation.js";
import { newConversation } from "../controllers/convesation.js";


//create 
router.post("/", newConversation );

//get 
router.get("/:userId", getUserConversation);

//get conversation includes two userid
router.get("/find/:firstUserId/:secondUserId", getconversationOfTwoUser);

export default router;