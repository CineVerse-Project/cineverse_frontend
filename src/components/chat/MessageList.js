import React from "react";

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((message, index) => (
                <p key={index}>
                    {message.sender}: {message.text}
                </p>
            ))}
        </div>
    );
};

export default MessageList;
