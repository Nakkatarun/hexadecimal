import React, { useState, useEffect } from 'react';
import axios from 'axios';
// importing the useState and useEffect from react

import "./App.css"

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');


  console.log(users)
  // using useEffect for fetching the data
  useEffect(() => {
    // Fetch initial data
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/v1/users');
      setUsers(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error('Error data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/v1/users/search?searchText=${searchText}`);
      setUsers(response.data);
      // console.log(response.data[0])
    } catch (error) {
      console.error('Error users:', error);
    }
  };
  
  return (
    <div className="main-container" >
      <section className="table-header">
        <h1 >HEXADECIMAL FRONT-END PROJECT</h1>
      </section>
    <div className="container">
      <div className="input-container" >
      <input
      className="input-field"
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="button-element" type="button" onClick={handleSearch}>Search</button>
      </div>
      <div className="table-container" >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>POSTS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.posts.map((post) => (
                  <div key={post.id}>{post.title}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
  );
};

export default App;
