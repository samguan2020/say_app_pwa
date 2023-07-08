import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, getMessages, getUsers } from '../../api';
import useStyles from './styles';

function combineMessages(messages) {
  
  let previousAuthor = null;
  const messageComponents = [];

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const messageComponent = {};

    // Check if the author has changed
    if (message.author !== previousAuthor) {
      messageComponent.author = message.userName;
      previousAuthor = message.author;
    }

    messageComponent.content = message.content;
    messageComponent.date = message.date;
    messageComponents.push(messageComponent);
  }

  return messageComponents;
}

const MessageComponent = ({ message }) => (
  <div>
    <Typography variant="h6" style={{ fontWeight: 'bold' }}>{message.author}</Typography>
    <Typography variant="h6">{message.content}</Typography>
  </div>
);

const Messages = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [oldMessageNumber, setOldMessageNumber] = useState(0);
  const [loading, setLoading] = useState(false); // Track loading status
  const [numberofMessages, setNumberofMessages] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const messagesRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();

    console.log(message);

    sendMessage({ content: message });
    setMessage(''); // Clear the message input field after sending
  };

  useEffect(() => {
    // Only send new getMessages request when the previous one completes
    if (!loading) {
      const fetchMessages = async () => {
        try {
          setLoading(true); // Set loading status to true
          const { data } = await getMessages(0,10);
          setMessages(combineMessages(data));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false); // Set loading status to false after completion
        }
      };

      // Fetch messages every 3 seconds
      const interval = setInterval(fetchMessages, 3000);

      return () => {
        clearInterval(interval); // Clean up the interval on component unmount
      };
    }
  }, [loading]);

  // useEffect(() => {
  //   const { scrollHeight, clientHeight } = messagesRef.current;
  //   messagesRef.current.scrollTop = scrollHeight - clientHeight;
  // }, [messages]);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSend}>
          <Typography variant="h6">Global Chat:</Typography>
          <div className={classes.messagesContainer} ref={messagesRef}>
            {messages.map((message, index) => (
              <MessageComponent message={message} key={index} />
            ))}
          </div>
          <Typography variant="h6">Send a Message</Typography>
          <TextField name="chat" variant="outlined" label="Chat" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Send</Button>
        </form>
      </Paper>
    </div>
  );
  
};

export default Messages;
