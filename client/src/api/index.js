import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });
// const API = axios.create({ baseURL: 'https://connect-app-pwa.herokuapp.com/' });


// Create a WebSocket connection
const socket = new WebSocket('ws://localhost:5000');

// Event listener for when the WebSocket connection is established
socket.addEventListener('open', () => {
  console.log('WebSocket connection established.');

  // Send a message to the WebSocket server
  socket.send('Hello, WebSocket server!');
});

// Event listener for incoming messages from the WebSocket server
socket.addEventListener('message', (event) => {
  const message = event.data;
  console.log('Received message:', message);

  // Handle the WebSocket message as needed
  // For example, you can update the UI or trigger a callback function
});

// Event listener for when the WebSocket connection is closed
socket.addEventListener('close', (event) => {
  console.log('WebSocket connection closed with code:', event.code);
});

// Event listener for WebSocket errors
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});


API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchDirectMessages = () => API.get(`/directMessages`);
export const sendDirectMessage = (receiverId,message) => API.post(`/directMessages/send/${receiverId}`, message);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const verify = (formData) => API.patch(`/user/verify/`,formData);
export const getVerify = (formData) => API.get(`/user/getVerify/`,formData);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const getUsers = () => API.get(`/messages/getUsers`);
//router.get('/', getMessages);
//router.post('/send', sendMessage);
export const sendMessage = (message) => API.post(`/messages/send`, message);
export const getMessages = (startindex,endindex) => API.get(`/messages/get/${startindex}/${endindex}`);