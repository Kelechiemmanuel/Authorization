import React, { useState } from 'react'
import API from '../API'

const DeletePost = () => {

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/${id}`);
      setSuccess("Post deleted");
       setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      setError(error.response?.data?.error)
    }
  }
  return (
    <div>
      {/* <h1>Delete Post</h1> */}
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      <button onClick={handleDelete}>Delete Post</button>
    </div>
  )
}

export default DeletePost