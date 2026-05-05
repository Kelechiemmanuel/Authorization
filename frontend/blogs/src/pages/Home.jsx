import React from 'react'
import API from '../API'
import Links from '../components/Links'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Subscribe from './Subscribe';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/post")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.log("Error fetching posts:", err);
      });
  }, []);

  return (
    <div>
      <div className='bg-[#115cfa] w-full'>
        <div className='flex justify-center items-center w-[50%] h-100 mx-auto flex-col gap-4 text-white'>
          <h1 className='text-[40px] font-bold'>Welcome to the Home page</h1>
          <p className='text-[18px] text-center'>
            Start your blog with Blocksy's free, responsive templates, tailored for various niches and ready to use.
            Create engaging content effortlessly with designs optimized for food, travel, personal, fashion, tech blogs, and more.
          </p>
        </div>
      </div>

      <div className='flex justify-center items-center p-5 shadow mb-30'>
        <Links />
      </div>

<div className='grid grid-cols-4 gap-10 place-items-center w-full px-40'>
  {posts.map((post) => (
    <div
      key={post.id}
      onClick={() => navigate(`/post/${post.id}`)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      {post.image_url && (
        <div className='w-full h-64 overflow-hidden'>
          <img
            src={post.image_url}
            alt={post.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      <h2 className="font-bold">{post.title}</h2>
      <p className="line-clamp-2">{post.content}</p>
      <small>By {post.name}</small>
    </div>
  ))}
</div>
     <Subscribe />

    </div>
  )
}

export default Home