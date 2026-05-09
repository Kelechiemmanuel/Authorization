import { useState, useEffect } from "react";
import API from "../API";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
import Update from "./Update";
import Sidebar from "../components/Sidebar";
import DeletePost from "./DeletePost";
import Monitoring from "./Monitoring";
import Profile from "./Profile";
import NewsLetter from "./NewsLetter";
import Published from "./Published";
import Draft from "./Draft";
import AllPost from "./AllPost";
import RecentActivity from "./RecentActivity";


const Dashboard = () => {
  const [active, setActive] = useState(() => {
    return localStorage.getItem("activePage") || "dashboard";
  });
  const [user, setUser] = useState(null);
  const [engagement, setEngagement] = useState([]);
  const [engagementPercent, setEngagementPercent] = useState([]);
  const [stat, setStat] = useState({
    members: 0,
    posts: 0,
    subscriptions: 0,
  })
  const COLORS = ["#3b82f6", "#ec4899", "#f59e0b"];

  useEffect(() => {
    API.get("/stats")
      .then((res) => setStat({
        members: Number(res.data.members),
        posts: Number(res.data.posts),
        subscriptions: Number(res.data.subscriptions),
      }))
      .catch(console.log);
  }, []);

  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    localStorage.setItem("activePage", active);
  }, [active]);

  const barData = [
    { name: "Users", value: stat.members },
    { name: "Posts", value: stat.posts },
    { name: "Subscribers", value: stat.subscriptions },
  ];

  const pieData = [
    { name: "Users", value: stat.members },
    { name: "Posts", value: stat.posts },
    { name: "Subscribers", value: stat.subscriptions },
  ];

  return (
    <div className="flex">
      <Sidebar setActive={setActive} />
      <div className="flex-1 ml-60 min-h-screen p-5 pt-20 mt-10">

        <div className="flex items-center text-white justify-between w-full p-10 rounded-sm bg-[#181a1e]">
          <div>
            <h2>Admin Dashboard</h2>
            <h1 className="text-3xl">Welcome back, {user?.name}</h1>
            <p>Manage your content and settings here</p>
          </div>

          <div className="flex gap-5">
            <button className="bg-[rgba(0,0,0,0.1)] p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("dashboard")}>
              Home
            </button>
            <button className="bg-[rgba(0,0,0,0.1)] p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("create")}>
              + Create Post
            </button>
            <button className="bg-[rgba(0,0,0,0.1)] p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("update")}>
              Update Post
            </button>
          </div>
        </div>

        {active === 'dashboard' && (
          <>
            <div className="flex items-center justify-between w-full bg-[#111] text-white p-10 rounded-sm my-5">
              <div className="flex gap-5">
                <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("members")}>
                  Total Members
                  <span className="ml-2 bg-white text-black px-2 py-1 rounded-sm">
                    {stat.members}
                  </span>
                </button>
                <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("posts")}>
                  Total Posts
                  <span className="ml-2 bg-white text-black px-2 py-1 rounded-sm">
                    {stat.posts}
                  </span>
                </button>
                <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("subscriptions")}>
                  Subscriptions
                  <span className="ml-2 bg-white text-black px-2 py-1 rounded-sm">
                    {stat.subscriptions}
                  </span>
                </button>
              </div>
            </div>

            <Monitoring />

            <AllPost />

            <RecentActivity />
          </>
        )}


        {active === "create" && <CreatePost />}
        {active === "update" && <Update />}
        {active === "delete" && <DeletePost />}
        {active === "profile" && <Profile />}
        {active === "monitoring" && <Monitoring />}
        {active === "newsletter" && <NewsLetter />}
        {active === "published" && <Published />}
        {active === "draft" && <Draft />}

      </div>


    </div>
  );
};

export default Dashboard;