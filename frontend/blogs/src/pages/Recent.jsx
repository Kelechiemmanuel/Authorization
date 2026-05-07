import React from 'react'
import { useEffect, useState } from 'react';
import API from '../API';

const Recent = () => {
    const [post, setPost] = useState(null);

useEffect(() => {
  API.get("/post/latest")
    .then((res) => setPost(res.data))
    .catch(console.log);
}, []);
  return (
    <div>
        {post && (
  <div className="cursor-pointer">
    {post.image_url && (
      <img
        src={post.image_url}
        alt={post.title}
        className="w-full h-96 object-cover"
      />
    )}

    <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
    <p className="text-gray-500">By {post.name}</p>
    <p className="mt-2">{post.content}</p>
  </div>
)}
    </div>
  )
}

export default Recent