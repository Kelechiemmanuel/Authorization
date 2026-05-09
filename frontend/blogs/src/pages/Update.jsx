import React, { useState } from 'react'
import API from '../API'

const Update = ({ post, onUpdate }) => {

  const [title, setTitle] = useState('title');
  const [content, setContent] = useState('content');
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {

      const res = await API.put(`/admin`, {
        title,
        content,
      });

      setSuccess("Post updated successfully");

      if (onUpdate) {
        onUpdate(res.data.post);
      }

    } catch (err) {
      console.log(err);
      setError("Failed to update post");
    }
  };

  return (
    <div className="flex flex-col gap-3">

      {success && (
        <p className="text-green-500">{success}</p>
      )}

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-[#1f1f1f] border border-gray-700 p-2 rounded"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="bg-[#1f1f1f] border border-gray-700 p-2 rounded"
      />

      <button
        onClick={handleUpdate}
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
      >
        Save Update
      </button>
    </div>
  )
}

export default Update;