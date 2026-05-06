import React from 'react'
import API from '../API'
import Links from '../components/Links'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Subscribe from './Subscribe';
import cover from '../assets/cover.png';

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
    <div className=''>
      <div className='bg-[#1f2228] w-full h-100 relative mb-200'>
        <div className='w-full absolute top-[50%] flex justify-between items-center gap-20 px-42'>
          <img src={cover} alt={cover} className='shadow' />
          <div className='flex justify-center items-center flex-col p-5 gap-5 w-full mt-50'>
            <h1 className='font-bold text-3xl text-[#1f2228]'>Daily News</h1>
            <Links />
          <hr className='border w-full border-[#e3e5e6] my-5'/>
            <div className='text-[#1f2228]'>
              <p className='text-[14px] leading-5'>
                Looking for a magazine-style design for your next blog project? Then “Daily News” is the answer for you!
              </p>
              <p className='text-[14px] mt-5 leading-7'>
               Packed with great new features for getting started quickly, such as a dark mode switch and multiple languages support, the information laid out on the website is sure to catch your eye as the design shines by highlighting big pictures which tell the story instantly and entice the users to browse around and find out more about what you have to say to the world.
              </p>
              <p className='text-[14px] mt-5 leading-5'>
              Available to all of our Pro subscribers at a click of a button, the “Daily News” starter site is sure to leave an impression that lasts. Give it a go now!
              </p>
              <hr className='border w-full border-[#d9dcde] my-5'/>
              <p><span className='font-bold text-[14px] leading-3'>Works with: </span> Gutenberg</p>
              <p><span className='font-bold text-[14px] leading-7'>Required plans: </span> Business or Agency</p>
              <p><span className='font-bold text-[14px] leading-7'>Category: </span> News, Blog, Business, Personal</p>
              <p><span className='font-bold text-[14px]'>Bundled plugins: </span> Fluent Forms, Greenshift, TranslatePress</p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 place-items-center w-full px-40 gap-10'>
        <div className='border border-[#d9dcde] text-[#1f2228] text-[13px] p-10 rounded-sm'>
          <div className='flex items-center gap-2'>
            <p className='text-4xl'>✅</p>
            <h2 className='text-md font-bold text-[#1f2228]'>Pixel Perfect Design</h2>
          </div>
          <div>
            <p>
              Pixel perfect accuracy with latest web trends at your fingertips without any coding needed.
            </p>
          </div>
        </div>
        <div className='border border-[#d9dcde] text-[#1f2228] text-[13px] p-10 rounded-sm'>
          <div className='flex items-center gap-2'>
            <p className='text-4xl'>✅</p>
            <h2 className='text-md font-bold text-[#1f2228]'>Responsive & Retina Ready</h2>
          </div>
          <div>
            <p>
              Unique layouts with the ability to control settings per each device and viewport.
            </p>
          </div>
        </div>
        <div className='border border-[#d9dcde] text-[#1f2228] text-[13px] p-10 rounded-sm'>
          <div className='flex items-center gap-2'>
            <p className='text-4xl'>✅</p>
            <h2 className='text-md font-bold text-[#1f2228]'>Flexible & Customizable</h2>
          </div>
          <div>
            <p>
              Mix and match anything, anywhere. Every element can be modified with ease.
            </p>
          </div>
        </div>
        <div className='border border-[#d9dcde] text-[#1f2228] text-[13px] p-10 rounded-sm'>
          <div className='flex items-center gap-2'>
            <p className='text-4xl'>✅</p>
            <h2 className='text-md font-bold text-[#1f2228]'>Perfect Foundation</h2>
          </div>
          <div>
            <p>
              Consistent workflow across the board helps you deliver the most ambitious ideas.
            </p>
          </div>
        </div>
        <div className='border border-[#d9dcde] text-[#1f2228] text-[13px] p-10 rounded-sm'>
          <div className='flex items-center gap-2'>
            <p className='text-4xl'>✅</p>
            <h2 className='text-md font-bold text-[#1f2228]'>Easy Setup</h2>
          </div>
          <div>
            <p>
              Easily install a starter site with just a few clicks via our simple demo importer module.
            </p>
          </div>
        </div>
        <div className='border border-[#d9dcde] text-[#1f2228] text-[13px] p-10 rounded-sm'>
          <div className='flex items-center gap-2'>
            <p className='text-4xl'>✅</p>
            <h2 className='text-md font-bold text-[#1f2228]'>Optimized for Speed</h2>
          </div>
          <div>
            <p>
              Optimized for speed to create a pleasant experience that really loads and feels fast.
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-10 place-items-center w-full px-40 mt-20'>
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="cursor-pointer"
          >
            {post.image_url && (
              <div className="w-full overflow-hidden shadow-2xl rounded-sm relative">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-113 object-cover hover:scale-110 transition duration-500"
                />
                <div className='absolute bg-[rgba(0,0,0,0.69)] bottom-0 w-full py-5 text-center'>
                  <small className='text-white'>By {post.name}</small>
                </div>
              </div>

            )}
            <div className='text-center my-8'>
              <h2 className="font-bold text-[#2d2e2e] mb-8 text-center">{post.title}</h2>
              <p className="line-clamp-2 text-[13px] text-[#6d7275]">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
      <Subscribe />

    </div>
  )
}

export default Home