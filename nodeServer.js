const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(3004, () => {
    console.log(`Server is running on http://localhost:3004`);
  });
  
// Endpoint to fetch user and post data
app.get('/v1/users', async (req, res) => {
  try {
    // Fetch user data
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    // Fetch post data
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = postsResponse.data;

    // Combine post data with user data based on userId
    const combinedData = users.map(user => {
      const userPosts = posts.filter(post => post.userId === user.id);
      return { ...user, posts: userPosts };
    });

    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to support user search functionality
app.get('/v1/users/search', async (req, res) => {
  const searchText = req.query.searchText;
  
  if (!searchText) {
    return res.status(400).json({ error: 'SearchText parameter is required' });
  }

  try {
    /* // Fetch user data
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;
   */ 

    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    // Fetch post data
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = postsResponse.data;

    // Combine post data with user data based on userId
    const combinedData = users.map(user => {
      const userPosts = posts.filter(post => post.userId === user.id);
      return { ...user, posts: userPosts };
    });
  

    // Filter users based on search text
    const matchingUsers = combinedData.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()));

    res.json(matchingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
