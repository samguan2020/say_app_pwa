import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { sendDirectMessage, getDirectMessages, getUsers } from '../../api';
import useStyles from './styles';
import DirectMessageList from './DirectMessageList';

const DirectMessageForm = ({ receiverId }) => {
  const [text, setText] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchUsers, 3000); // Fetch users every 3 seconds

    return () => {
      clearInterval(interval); // Cleanup the interval on component unmount
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendDirectMessage(recipient, { content: text });
      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">Direct Message</Typography>
          <DirectMessageList />
          
          <div className={classes.users}>
            <Select value={recipient} onChange={(event) => setRecipient(event.target.value)}>
              <MenuItem value="">Select a recipient</MenuItem>
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Send
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default DirectMessageForm;
