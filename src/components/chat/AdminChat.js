import React, { useState, useEffect } from "react";
import {
    ref,
    query,
    equalTo,
    onValue,
    orderByChild,
    push,
    update,
} from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";
import { database, serverTimestamp } from "./../../constants/firebase";
import "./css/admin-chat.css";
import { useRef } from "react";

const useUserMessages = (selectedUser) => {
    const [userMessages, setUserMessages] = useState([]);
    const [adminMessages, setAdminMessages] = useState([]);
    const messagesRef = ref(database, "messages");

    useEffect(() => {
        if (selectedUser !== "") {
            const adminMessagesRef = query(
                messagesRef,
                orderByChild("receiver"),
                equalTo(selectedUser)
            );

            const userMessagesRef = query(
                messagesRef,
                orderByChild("sender"),
                equalTo(selectedUser)
            );

            const adminMessagesListener = onValue(
                adminMessagesRef,
                (snapshot) => {
                    const messages = [];
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const data = childSnapshot.val();
                        messages.push({ key, ...data });
                    });
                    setAdminMessages(messages);
                }
            );

            const userMessagesListener = onValue(
                userMessagesRef,
                (snapshot) => {
                    const messages = [];
                    snapshot.forEach((childSnapshot) => {
                        const key = childSnapshot.key;
                        const data = childSnapshot.val();
                        messages.push({ key, ...data });
                    });
                    setUserMessages(messages);
                }
            );

            return () => {
                adminMessagesListener();
                userMessagesListener();
            };
        }
    }, [selectedUser]);

    return { userMessages, adminMessages };
};

const AdminChat = () => {
    const [message, setMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [usersSnapshot] = useObject(ref(database, "users"));
    const { userMessages, adminMessages } = useUserMessages(selectedUser);
    const allMessages = [...userMessages, ...adminMessages];
    const sortedMessages = allMessages.sort(
        (a, b) => a.timestamp - b.timestamp
    );
    const [sortedUsernames, setSortedUsernames] = useState();

    const handleUserSelection = (username) => {
        setSelectedUser(username);
        const newUserPath = `users/` + username;
        update(ref(database, newUserPath), {
            adminRead: false,
        });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            const newMessage = {
                text: message,
                sender: "Admin",
                receiver: selectedUser,
                timestamp: serverTimestamp(),
            };

            push(ref(database, "messages"), newMessage);
            setMessage("");
        }
    };
    const messageListRef = useRef(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop =
                messageListRef.current?.scrollHeight;
        }
    }, [sortedMessages]);

    // useEffect(() => {
    //     if (usersSnapshot && usersSnapshot.val()) {
    //         const users = usersSnapshot.val();
    //         const sortedUsernames = Object.keys(users).sort(
    //             (a, b) => users[b].lastSend - users[a].lastSend
    //         );
    //         setSortedUsernames(sortedUsernames);
    //     }
    // }, [usersSnapshot]);
    // console.log(sortedUsernames);

    useEffect(() => {
        if (usersSnapshot && usersSnapshot.val()) {
            const users = usersSnapshot.val();
            const sortedUsernames = Object.keys(users).sort(
                (a, b) => users[b].lastSend - users[a].lastSend
            );
            const sortedUsers = sortedUsernames.map((username) => ({
                username: username,
                adminRead: users[username].adminRead,
            }));

            setSortedUsernames(sortedUsers);
        }
    }, [usersSnapshot]);
    console.log(sortedUsernames);

    return (
        <>
            <div className="content-wrapper p-3">
                <h4 className="fw-bold py-3 mb-4 text-center">Chat hỗ trợ</h4>
                <div
                    className="row chatroom  mt-1 h-100"
                    style={{ marginLeft: "0", marginRight: "0" }}
                >
                    <div className="listefriend d-none d-lg-block col-lg-4">
                        <div className="row listheader">
                            <div className="search h-100 w-100 position-relative"></div>
                        </div>
                        <div
                            className="row listbody position-relative h-100"
                            id="scrollstyle"
                        >
                            {sortedUsernames && Object.keys(sortedUsernames) ? (
                                <ul className="list-group">
                                    {sortedUsernames.map((value, index) => (
                                        <>
                                            <li
                                                className="row"
                                                key={index}
                                                onClick={() =>
                                                    handleUserSelection(
                                                        value.username
                                                    )
                                                }
                                            >
                                                <div className="col-4 ">
                                                    <img
                                                        src="https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                                                        className="img-fluid rounded-circle border border-secondary"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="col-8 mt-4 d-flex align-items-center justify-space-between">
                                                    {selectedUser ===
                                                        value?.username && (
                                                        <span className="fw-bolder">
                                                            {value.username}
                                                        </span>
                                                    )}
                                                    {selectedUser !==
                                                        value?.username && (
                                                        <span>
                                                            {value.username}
                                                        </span>
                                                    )}{" "}
                                                    {value?.adminRead && (
                                                        <span class="badge bg-danger">
                                                            new
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        </>
                                    ))}
                                </ul>
                            ) : (
                                <p>No users available.</p>
                            )}
                        </div>
                    </div>
                    <div className="chatingzone col-sm-12 col-lg-8 position-relative">
                        <div className="row chatheader" style={{ height: 100 }}>
                            <div className="down col-9 row pr-0">
                                <div className="col-2 pr-0">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                                        className="img-fluid rounded-circle border border-secondary"
                                        alt=""
                                    />
                                </div>
                                <div className="col-10 mt-4">
                                    {selectedUser && <h4>{selectedUser}</h4>}
                                </div>
                            </div>
                        </div>
                        <div
                            className="row chatbody"
                            id="scrollstyle"
                            ref={messageListRef}
                        >
                            <ul className="list-group w-100 position-relative list-unstyled h-100">
                                {sortedMessages &&
                                    sortedMessages?.map((msg, index) => {
                                        if (msg.receiver === "Admin") {
                                            return (
                                                <li className="message-local">
                                                    {msg.text}
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li className="message-remote">
                                                    {msg.text}
                                                </li>
                                            );
                                        }
                                    })}
                            </ul>
                        </div>
                        <form
                            class="input-group mb-3 px-2"
                            onSubmit={handleSendMessage}
                        >
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Nhập tin nhắn"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <div
                                className="btn btn-primary"
                                onClick={handleSendMessage}
                            >
                                Gửi
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminChat;
