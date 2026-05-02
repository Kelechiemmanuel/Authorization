import React from 'react'
import API from '../API'
import { useState, useEffect } from 'react'

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
  API.get("/post")
    .then((res) => setPosts(res.data))
    .catch((err) => {
      console.log("Error fetching posts:", err);
    });
}, []);

  return (
    <div>
        <h1>Welcome to the Home page</h1>
        {posts.map((post) => (
            <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>By {post.name}</small>
            </div>
        ))}
    </div>
  )
}

export default Home