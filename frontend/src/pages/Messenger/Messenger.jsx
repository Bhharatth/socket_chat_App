import React, { useContext, useEffect, useState } from "react";
import "./Messenger.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { PF } from "../../apiCalls";
import Conversation from "../../components/conversations/Conversations";
import Messages from "../../components/messages/Messages";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentchat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // console.log(user);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      const res = await axios.get(PF + "/api/conversations/" + user._id);
      setConversation(res.data);
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(PF + "/api/messages/" + currentChat?._id);
      setMessages(res.data);
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      seder: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post(PF + "/api/messages//" ,message);
      setMessages([...message, res.data]);
      setNewMessage("")
      
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversation.map((c) => (
              <>
                <div onClick={() => setCurrentchat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <Messages message={m} own={m.sender === user._id} />
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"></div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
