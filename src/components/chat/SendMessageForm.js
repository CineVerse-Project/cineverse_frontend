import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { database } from "./firebase";

const SendMessageForm = ({ sender, receiver }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();

        if (newMessage.trim() !== "") {
            const messagesRef = ref(database, "messages");
            const newMessageRef = push(messagesRef);
            const newMessageData = {
                sender: sender,
                receiver: receiver,
                text: newMessage,
            };
            setNewMessage("");

            set(newMessageRef, newMessageData);
        }
    };

    return (
        <form onSubmit={handleSendMessage}>
            <input
                type="text"
                value={newMessage}
                onChange={handleNewMessageChange}
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default SendMessageForm;
