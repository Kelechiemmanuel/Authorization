import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [posts, setPosts] = useState([]);

  const API = axios.create({
    baseURL: "http://localhost:3999",
  })

  API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token){
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  })

    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/post"); // or "/messages"
        setPosts(res.data);
      } catch (err) {
        console.log("FETCH ERROR:", err.message);
      }
    };

    fetchPosts();
  }, []);
  return (
     <div style={{ padding: "20px" }}>
      <h1>Blogs</h1>

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>By {post.sender_name}</small>
          </div>
        ))
      )}
    </div>
  )
}

export default App