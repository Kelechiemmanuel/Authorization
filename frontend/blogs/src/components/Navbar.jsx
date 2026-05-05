import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Link} from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Designs from "../pages/Designs";
import Development from "../pages/Development";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow fixed w-full bg-white z-10 top-0">
      <h1
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        JETkey
      </h1>

      <div className='flex justify-center items-center gap-5'>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/designs">Designs</Link>
        <Link to="/development">Development</Link>
      </div>

      <div className="flex items-center gap-4">
        {!isDashboard ? (

          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        ) : (

          <>
            {/* <button onClick={() => navigate("/profile")}>Profile</button> */}
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;