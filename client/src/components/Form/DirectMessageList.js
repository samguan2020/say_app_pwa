import React, { useEffect, useState, useRef } from 'react';
import { fetchDirectMessages } from '../../api';
import useStyles from './styles';

const DirectMessageList = () => {
    const classes = useStyles();
    const [messages, setMessages] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const messagesRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!loading) {
            const getDirectMessages = async () => {
                try {
                    const res = await fetchDirectMessages();
                    console.log(res.data);
                    const groupedMessages = res.data.reduce((acc, message) => {
                        if (!acc[message.author]) {
                            acc[message.author] = {
                                userName: message.userName,
                                messages: []
                            };
                        }
                        acc[message.author].messages.push(message.content);
                        return acc;
                    }, {});
                    setMessages(groupedMessages);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            getDirectMessages();
        }
    }, [loading]);

    return (
        <div className={classes.messagesContainer} ref={messagesRef}>
            {Object.entries(messages).map(([authorId, { userName, messages }]) => (
                <div key={authorId}>
                    <button onClick={() => setSelectedUser(authorId)} variant="contained" color="primary" size="large" type="submit" fullWidth>{userName}</button>
                    {selectedUser === authorId && messages.map((message, index) => (
                        <p key={index}>Content: {message}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DirectMessageList;
