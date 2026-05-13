import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Designs from '../pages/Designs'
import Development from '../pages/Development'
import API from '../API'
import Login from '../pages/Login'
import { Search, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const Links = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    API.get("/post")
      .then((res) => {
        console.log(res.data); // check data
        setPosts(Array.isArray(res.data) ? res.data : []);
      })
      .catch(console.log);
  }, []);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 4);

  return (
    <nav className='flex justify-between items-center gap-5 w-full'>

      <div className='w-full'>

        <ul className='md:flex gap-5 justify-between hidden w-full'>
          <Link to="/">All</Link>
          <Link to="/products">Products</Link>
          <Link to="/designs">Designs</Link>
          <Link to="/development">Development</Link>
        </ul>
        <div className='flex justify-between w-full'>
          <h1 className="text-3xl font-bold block lg:hidden">Jet News</h1>
          <button onClick={() => setOpen(!open)} className='md:hidden cursor-pointer'>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[rgba(0,0,0,0.76)] backdrop-blur-sm z-10"
          />
          <ul className={`flex justify-between items-start p-10 fixed left-0 h-screen bg-black top-0 gap-5  transform transition-transform duration-700 ease-out overflow-y-auto
        md:hidden w-[60%] z-20 ${open ? "translate-x-0" : "translate-x-full"}`}>
            <div className='flex flex-col justify-center items-start gap-5 mt-10'>
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Economy</Link>
              <Link to="/designs" onClick={() => setOpen(false)}>Culture</Link>
              <Link to="/development" onClick={() => setOpen(false)}>Politics</Link>
              <Link to="/development" onClick={() => setOpen(false)}>Science</Link>
              <Link to="/development" onClick={() => setOpen(false)}>Technology</Link>
              <Link to="/development" onClick={() => setOpen(false)}>Travel</Link>
              <Link to="/development" onClick={() => setOpen(false)}>World</Link>
              <Link to="/development" onClick={() => setOpen(false)}>About</Link>
              <Link to="/development" onClick={() => setOpen(false)}>Contact</Link>
              <div className="flex gap-4 mt-4">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  Login
                </button>

                <button
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/register");
                    setOpen(false);
                  }}
                >
                  Register
                </button>
              </div>
            </div>

            <div>
              <button onClick={() => setOpen(!open)} className='md:hidden cursor-pointer'>
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </ul>
        </>
      )}
    </nav>
  )
}

export default Links