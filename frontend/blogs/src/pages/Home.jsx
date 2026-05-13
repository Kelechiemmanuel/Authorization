import React from 'react'
import API from '../API'
import Links from '../components/Links'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Subscribe from './Subscribe';
import cover from '../assets/cover.png';
import back from '../assets/back.png';
import Specialization from './Specialization';
import Footer from './Footer';
import DeletePost from './DeletePost';
import Recent from './Recent';
import { motion } from 'framer-motion'
import WorldMap from './WorldMap';

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
      <motion.div className=''
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='bg-[#1f2228] w-full h-100'
        >

          <div
            className='w-full flex flex-col px-5 items-center gap-20 pt-40
    md:flex-col md:px-10
    lg:justify-between lg:px-42 lg:flex-row'
          >

            {/* IMAGE */}
            <motion.img
              src={cover}
              alt={cover}
              className='shadow w-full'

              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}

              transition={{
                duration: 0.8,
              }}

              viewport={{ once: true }}
            />


            <motion.div
              className='flex justify-center items-center flex-col p-5 gap-5 w-full lg:pt-70'

              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}

              transition={{
                duration: 0.8,
                delay: 0.2,
              }}

              viewport={{ once: true }}
            >

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}

                className='font-bold text-3xl text-[#1f2228]'
              >
                Daily News
              </motion.h1>

              <Links />

              <hr className='border w-full border-[#e3e5e6] my-5' />

              <motion.div
                className='text-[#1f2228]'

                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}

                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}

                viewport={{ once: true }}
              >

                <p className='text-[14px] leading-5'>
                  Looking for a magazine-style design for your next blog project?
                  Then “Daily News” is the answer for you!
                </p>

                <p className='text-[14px] mt-5 leading-7'>
                  Packed with great new features for getting started quickly,
                  such as a dark mode switch and multiple languages support,
                  the information laid out on the website is sure to catch
                  your eye as the design shines by highlighting big pictures
                  which tell the story instantly and entice the users to browse
                  around and find out more about what you have to say to the world.
                </p>

                <p className='text-[14px] mt-5 leading-5'>
                  Available to all of our Pro subscribers at a click of a button,
                  the “Daily News” starter site is sure to leave an impression
                  that lasts. Give it a go now!
                </p>

                <hr className='border w-full border-[#d9dcde] my-5' />

                <p>
                  <span className='font-bold text-[14px] leading-3'>
                    Works with:
                  </span>{" "}
                  Gutenberg
                </p>

                <p>
                  <span className='font-bold text-[14px] leading-7'>
                    Required plans:
                  </span>{" "}
                  Business or Agency
                </p>

                <p>
                  <span className='font-bold text-[14px] leading-7'>
                    Category:
                  </span>{" "}
                  News, Blog, Business, Personal
                </p>

                <p>
                  <span className='font-bold text-[14px]'>
                    Bundled plugins:
                  </span>{" "}
                  Fluent Forms, Greenshift, TranslatePress
                </p>

              </motion.div>

            </motion.div>

          </div>

        </motion.div>


        <div className='lg:mt-180 md:mt-350 mt-290'>
          <div className='md:px-14 lg:px-40 px-5 my-20'>
            <hr className='border border-[#e3eff7]' />
          </div>
          <Specialization />
          <div className='lg:px-40 md:px-14 px-5 my-20'>
            <hr className='border border-[#e3eff7]' />
          </div>
        </div>

        <div className='grid gap-10 grid-cols-1 px-5 place-items-center w-full mt-20
      md:grid-cols-2 md:px-14
      lg:grid-cols-4 lg:px-40
      '>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className="cursor-pointer"

              initial={{ opacity: 0, y: 50 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}

              viewport={{
                once: true,
                amount: 0.3,
              }}

              whileHover={{
                scale: 1.03,
                y: -5,
              }}
            >
              {post.image_url && (
                <div className="w-full overflow-hidden shadow-2xl rounded-sm relative blog shrink-0">

                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="
            w-full
            h-64 sm:h-80 md:h-96 lg:h-112.5
            object-cover object-top
            hover:scale-110
            transition duration-500
          "
                  />

                  <div className='absolute bg-[rgba(0,0,0,0.69)] bottom-0 w-full py-5 text-center'>
                    <small className='text-white'>
                      By {post.name}
                    </small>
                  </div>

                </div>
              )}

              <div className='text-center mt-8'>
                <h2 className="font-bold text-[#2d2e2e] mb-8 text-center">
                  {post.title}
                </h2>

                <p className="line-clamp-2 text-[13px] text-[#6d7275]">
                  {post.content}
                </p>
              </div>

            </motion.div>
          ))}
          <div className='justify-center flex'>
            {/* <Recent /> */}

          </div>
        </div>

        <div className=' py-8'>
          <div>
            <div className='px-40 my-10'>
            </div>
            <Subscribe />
            {/* <DeletePost /> */}
          </div>
          <div>
            <div className='md:px-14 lg:px-40 px-5 my-10'>
              <hr className='border border-[#e3eff7]' />
            </div>
            <Footer />
          </div>
        </div>


      </motion.div>
      <WorldMap />
    </div>
  )
}

export default Home