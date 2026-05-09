import React from 'react'
import { useState, useEffect } from 'react';
import API from '../API';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Monitoring = () => {
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
    <div>
      <div className="flex w-full justify-between gap-5 mb-10">
        <div className="bg-[#181a1e] w-[40%] p-4 shadow rounded mb-10 outline-none focus:outline-none">
          <h3 className="mb-4 text-white">Overview</h3>
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

        <div className="bg-[#181a1e] p-4 shadow rounded h-92 w-[70%]">
          <h3 className="mb-4 text-white">Engagement per Day</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagement}>
              <XAxis dataKey="day" />
              <YAxis tick={{ fontSize: 10 }} />
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
      <div className="bg-[#111111] text-white p-4 shadow rounded my-5 flex gap-5 flex-col">
        <h3 className="font-semibold">Engagement</h3>

        {engagementPercent.map((item, index) => (
          <div key={index} className="flex justify-between py-2 px-5 border border-gray-500">
            <span>{item.day}</span>
            <span className="text-green-600 font-bold">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Monitoring