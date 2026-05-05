import React from 'react'
import API from '../API'
import { useState } from 'react'

const CreatePost = () => {
    const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [image, setImage] = useState(null);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("content", form.content);
      formData.append("image", image);

      await API.post("/admin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Post created successfully");
      setError("");

      setForm({ title: "", content: "" });
      setImage(null);

      setTimeout(() => setSuccess(""), 3000);

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");

      setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div>
      <h2>Create Post</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        placeholder="Content"
        value={form.content}
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

    
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={handlePost}>Create Post</button>
    </div>
  )
}

export default CreatePost