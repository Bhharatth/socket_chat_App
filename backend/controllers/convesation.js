import AsyncHandler from "express-async-handler";
import Conversation from "../models/Conversation.js";

//new conversation

export const newConversation = AsyncHandler(async (req, res) => {
  const { senderId, recieverId } = req.body;
  const newConversation = new Conversation({
    members: [senderId, recieverId],
  });

  try {
    const savedConversavtion = await newConversation.save();
    res.status(200).json(savedConversavtion);
  } catch (error) {
    res.status(400).json(error);
  }
});

//GET CONVERSATION OF A USER

export const getUserConversation = AsyncHandler(async (req, res) => {
  const { userId } = req.params;

  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json(error);
  }
});

//GET CONVERSATION INCLUDES TWO USERID

export const getconversationOfTwoUser = AsyncHandler(async (req, res) => {
  const { firstUserId, secondUserId } = req.params;

  try {
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json(error);
  }
});
