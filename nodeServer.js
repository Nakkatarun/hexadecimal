const express = require('express');
const axios = require('axios');
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(3004, () => {
    console.log(`Server is running on http://localhost:3004`);
  });
  
// get the data using /v1/users  
app.get('/v1/users', async (req, res) => {
  try {
    // getting user data
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    // getting post data
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
    res.status(500).json({ error: 'Server Error' });
  }
});

// get the data using /v1/users/search applying query parameters
app.get('/v1/users/search', async (req, res) => {
  const searchText = req.query.searchText;
  
  if (!searchText) {
    return res.status(400).json({ error: 'SearchText parameter is required' });
  }

  try {

    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data;

    // getting post data
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = postsResponse.data;

    // Combining the response data
    const combinedData = users.map(user => {
      const userPosts = posts.filter(post => post.userId === user.id);
      return { ...user, posts: userPosts };
    });
  

    // Filter users based on search text
    const matchingUsers = combinedData.filter(user => user.name.toLowerCase().includes(searchText.toLowerCase()));

    res.json(matchingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: ' Server Error' });
  }
});
