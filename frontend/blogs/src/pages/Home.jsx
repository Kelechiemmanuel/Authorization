import React from 'react'
import API from '../API'
import Links from '../components/Links'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Subscribe from './Subscribe';
import cover from '../assets/cover.png';
import Specialization from './Specialization';
import Footer from './Footer';
import DeletePost from './DeletePost';

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
      <div className='bg-[#1f2228] w-full h-100 relative mb-180'>
        <div className='w-full absolute top-[50%] flex justify-between items-center gap-20 px-42'>
          <img src={cover} alt={cover} className='shadow' />
          <div className='flex justify-center items-center flex-col p-5 gap-5 w-full mt-50'>
            <h1 className='font-bold text-3xl text-[#1f2228]'>Daily News</h1>
            <Links />
            <hr className='border w-full border-[#e3e5e6] my-5' />
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
              <hr className='border w-full border-[#d9dcde] my-5' />
              <p><span className='font-bold text-[14px] leading-3'>Works with: </span> Gutenberg</p>
              <p><span className='font-bold text-[14px] leading-7'>Required plans: </span> Business or Agency</p>
              <p><span className='font-bold text-[14px] leading-7'>Category: </span> News, Blog, Business, Personal</p>
              <p><span className='font-bold text-[14px]'>Bundled plugins: </span> Fluent Forms, Greenshift, TranslatePress</p>
            </div>
          </div>
        </div>
      </div>


      <div>
        <div className='px-40 my-20'>
          <hr className='border border-[#e3eff7]' />
        </div>
        <Specialization />
        <div className='px-40 my-20'>
          <hr className='border border-[#e3eff7]' />
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

      <div className='bg-[#f4f5f8] py-8'>
        <div>
          <div className='px-40 my-10'>
          </div>
          <Subscribe />
          {/* <DeletePost /> */}
        </div>
        <div>
          <div className='px-37 my-10'>
            <hr className='border border-[#e3eff7]' />
          </div>
          <Footer />
        </div>
      </div>


    </div>
  )
}

export default Home