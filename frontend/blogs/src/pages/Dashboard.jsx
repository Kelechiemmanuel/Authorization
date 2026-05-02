import { useState } from "react"
import API from "../API";
import Sidebar from "../components/Sidebar";
import Update from "./Update";
import CreatePost from "./CreatePost";
import Profile from "./Profile";

const Dashboard = () => {
  const [active, setActive] = useState("create");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handlePost = async () => {
    try {
      await API.post("/admin", form);
      setSuccess("Post created successfully");
      setError("");

      setForm({
      title: '',
      content: ''
      });

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");

      setTimeout(() => {
        setError("");
      }, 3000);

    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>


      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

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

      <button onClick={handlePost}>Create Post</button>
    </div>
  );
};

export default Dashboard;