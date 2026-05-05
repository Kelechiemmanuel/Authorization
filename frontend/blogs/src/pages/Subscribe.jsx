import { useState } from "react";
import API from "../api";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async () => {
    try {
      const res = await API.post("/subscriptions", { email });
      setMsg(res.data.message);
      setEmail("");
    } catch (err) {
      setMsg(err.response?.data?.error);
    }

    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div>
      <h3>Subscribe to our blog</h3>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubscribe}>
        Subscribe
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Subscribe;