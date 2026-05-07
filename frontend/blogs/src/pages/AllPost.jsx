import React, { useEffect, useState } from 'react'
import API from '../API';
import DeletePost from './DeletePost';
import Update from './Update';

const AllPost = () => {
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
    <div className="bg-[#181a1e] text-white p-6 rounded-sm">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recent Posts</h1>

        <input
          type="text"
          placeholder="Search post..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#1f1f1f] border border-gray-700 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className=" border border-gray-700 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">
                {post.title}
              </h2>

              <p className="text-gray-400 text-sm">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex gap-3">
              <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition">
                Update
              </button>

              <DeletePost
                postId={post.id}
                onDelete={(id) =>
                  setPosts(posts.filter((p) => p.id !== id))
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;