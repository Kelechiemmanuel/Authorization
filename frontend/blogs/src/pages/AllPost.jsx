import React, { useEffect, useState } from 'react';
import API from '../API';

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    API.get("/post/latest")
      .then((res) => setPosts(res.data))
      .catch(console.log);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/${id}`);
      fetchPosts(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  // START EDIT
  const handleEdit = (post) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      content: post.content
    });
  };

  // UPDATE
//   const handleUpdate = async (id) => {
//     try {
//       await API.put(`/record/${id}`, form);
//       setEditingId(null);
//       fetchPosts();
//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-5">All Posts</h1>

      <div className="grid grid-cols-3 gap-5">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 shadow rounded">

            {editingId === post.id ? (
              <>
                <input
                  className="border w-full mb-2 p-2"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                <textarea
                  className="border w-full mb-2 p-2"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                />

                <button
                  onClick={() => handleUpdate(post.id)}
                  className="bg-green-500 text-white px-3 py-1 mr-2"
                >
                  Save
                </button>

                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-400 text-white px-3 py-1"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-sm text-gray-500">By {post.name}</p>
                <p className="text-sm mt-2 line-clamp-2">
                  {post.content}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-blue-500 text-white px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-3 py-1"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;