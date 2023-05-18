import AsyncHandler from "express-async-handler";
import Messages from "../models/Messages.js";

//create messages or add messages
export const createNewMessages = AsyncHandler(async (req, res) => {
  const { conversationId, sender, text  } = req.body;

  try {
    const new_message = new Messages({ conversationId, sender, text});
    const savedMessages = await new_message.save();
    res.status(200).json(savedMessages);
  } catch (error) {
    res.status(400).json(error);
  }
});

//get messages

export const getMessages = AsyncHandler(async (req, res) => {
  const conversationid = req.params.conversationId
  try {
    const messages = await Messages.find({
      conversationId: conversationid,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});


