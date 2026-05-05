import React from 'react'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/Products'
import Designs from '../pages/Designs'
import Development from '../pages/Development'

const Links = () => {
  return (
    <div className='flex justify-center items-center gap-5'>
      <Link to="/">View All</Link>
      <Link to="/products">Products</Link>
      <Link to="/designs">Designs</Link>
      <Link to="/development">Development</Link>
    </div>
  )
}

export default Links