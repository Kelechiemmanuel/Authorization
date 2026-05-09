import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Designs from '../pages/Designs'
import Development from '../pages/Development'
import API from '../API'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

const Links = () => {
    const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className='flex justify-between items-center gap-5 w-full'>
      <div>
          <input
          placeholder='search post...'
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1f1f1f] border border-gray-700 px-4 py-2 rounded-lg outline-none"
        />

      </div>
      <Link to="/">All</Link>
      <Link to="/products">Products</Link>
      <Link to="/designs">Designs</Link>
      <Link to="/development">Development</Link>
    </div>
  )
}

export default Links