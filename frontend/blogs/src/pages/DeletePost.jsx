import React, { useState } from 'react'
import API from '../API'

const DeletePost = ({ postId, onDelete }) => {

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      await API.delete(`/admin`);

      setSuccess("Post deleted successfully");

      if (onDelete) {
        onDelete(postId);
      }

    } catch (err) {
      console.log(err);
      setError("Failed to delete post");
    }
  };

  return (
    <div>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleDelete}
        className="border border-red-500 text-red-500 px-4 py-1 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer"
      >
        Delete
      </button>
    </div>
  )
}

export default DeletePost;