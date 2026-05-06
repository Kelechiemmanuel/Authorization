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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import AllPost from "./AllPost";


const Dashboard = () => {
  const [active, setActive] = useState("create");
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
  API.get("/engagement")
    .then((res) => {
      const data = res.data.map(item => ({
        day: item.day,
        count: Number(item.count),
      }));

      const total = data.reduce((sum, item) => sum + item.count, 0);

      const percentData = data.map(item => ({
        day: item.day,
        percent: total ? ((item.count / total) * 100).toFixed(1) : 0,
      }));

      setEngagement(data);
      setEngagementPercent(percentData);
    })
    .catch(console.log);
}, []);

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
      <div className="flex-1 ml-60 bg-gray-100 min-h-screen p-5 pt-10 mt-10">

        <div className="flex items-center justify-between w-full bg-blue-600 text-white p-10 rounded-sm">
          <div>
            <h2>Admin Dashboard</h2>
            <h1 className="text-3xl">Welcome back, {user?.name}</h1>
            <p>Manage your content and settings here</p>
          </div>

          <div className="flex gap-5">
            <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("create")}>
              + Create Post
            </button>
            <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("update")}>
              Update Post
            </button>
            <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("delete")}>
              Delete Post
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between w-full bg-blue-600 text-white p-10 rounded-sm my-5">
          <div className="flex gap-5">
            <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("members")}>
              Total Members
              <span className="ml-2 bg-white text-blue-600 px-2 py-1 rounded-sm">
                {stat.members}
              </span>
            </button>
            <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("posts")}>
              Total Posts
              <span className="ml-2 bg-white text-blue-600 px-2 py-1 rounded-sm">
                {stat.posts}
              </span>
            </button>
            <button className="bg-[rgba(0,0,0,0.1)] text-white p-3 rounded-sm h-10 flex items-center justify-center" onClick={() => setActive("subscriptions")}>
              Subscriptions
              <span className="ml-2 bg-white text-blue-600 px-2 py-1 rounded-sm">
                {stat.subscriptions}
              </span>
            </button>
          </div>
        </div>

        <div className="flex w-full justify-between gap-5 mb-10">
          <div className="bg-white w-[40%] p-4 shadow rounded mb-10 outline-none focus:outline-none">
            <h3 className="mb-4">Overview</h3>
            <ResponsiveContainer width="70%" height={300}>
              <BarChart data={barData} >
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6">
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#8b5cf6" />

                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 shadow rounded h-92 w-[70%]">
            <h3 className="mb-4">Engagement per Day</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagement}>
                <XAxis dataKey="day" />
                <YAxis tick={{ fontSize: 10 }}/>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded mt-5">
  <h3 className="mb-3 font-semibold">Engagement</h3>

  {engagementPercent.map((item, index) => (
    <div key={index} className="flex justify-between py-2 px-5 border border-gray-500">
      <span>{item.day}</span>
      <span className="text-green-600 font-bold">
        {item.percent}%
      </span>
    </div>
  ))}
</div>

<AllPost />

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