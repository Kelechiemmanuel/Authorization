import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Designs from "../pages/Designs";
import Development from "../pages/Development";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Links from "./Links";
import API from "../API";

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [opening, setOpening] = useState(false);
  const [posts, setPosts] = useState([]);

  const isDashboard = location.pathname.startsWith("/dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    API.get('/post')
      .then((res) => setPosts(res.data))
      .catch((err) => {
        console.log("Error fetching Post");

      })
  })

return (
  <>
    {!isDashboard && (
      <nav className="flex justify-between items-center p-4 border-b w-full bg-white z-10 top-0 px-5 lg:px-42">

        <div className='hidden lg:flex justify-center items-center gap-10 w-full'>
          <div className="flex justify-center items-center gap-10">
            <button onClick={() => setOpening(!opening)} className="cursor-pointer">
              {opening ? <X size={28}/> : <Menu size={28}/>}
            </button>
            <button onClick={toggleTheme} className="cursor-pointer">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center w-full">
            <h1 className="text-3xl font-bold">Jet News</h1>
            <p className="hidden lg:flex text-[12px]">All voices matter</p>
          </div>
        </div>

        <div className='flex justify-between items-center gap-10 lg:hidden w-full'>
          <div className="flex justify-center items-center gap-10 w-full">
            <Links />
            <button onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden lg:flex" onClick={() => navigate("/login")}>Login</button>
          <button className="hidden lg:flex" onClick={() => navigate("/register")}>Register</button>
        </div>

        {opening && (
          <>
            <div
              onClick={() => setOpening(false)}
              className="fixed inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-10 hidden lg:block"
            />

            <div className={`lg:flex hidden justify-between flex-col items-start p-10 fixed left-0 h-screen bg-black top-0 gap-5 overflow-y-auto  
              transform transition-transform duration-700 ease-out w-[40%] z-20 ${opening ? "translate-x-0" : "translate-x-full"}`}>

              <div className="flex justify-between items-center w-full">
                <h1>Breaking News</h1>
                <button onClick={() => setOpening(!opening)}>
                  {opening ? <X size={28}/> : <Menu size={28}/>}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5 w-full">
                {posts.map((post) => (
                  <div key={post.id}>
                    {post.image_url && (
                      <div className="relative">
                        <img src={post.image_url} className="w-full h-50 object-cover" />
                        <div className='absolute bottom-0 w-full bg-black/70 text-center text-white py-3'>
                          <small>By {post.name}</small>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </>
        )}

      </nav>
    )}
  </>
);
};

export default Navbar;