import { useState } from "react";
import API from "../API";

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
    <div className="grid grid-cols-2 place-items-center w-full px-39 gap-10 my-20">
      <div className='border border-[#d9dcde] text-[#1f2228] p-10 rounded-sm'>
        <h1>Stay Informed with Early Updates!</h1>
        <p className='text-[14px] leading-8'>
          Subscribe to our newsletter and receive the latest theme updates and important news directly to your inbox.
        </p>
      </div>
      <div>
        <h3 className="text-[#1f2228]">Subscribe to our blog</h3>

        <div className="border border-[#e3e5e6] w-full p-2 rounded-sm pl-5 mt-5">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-0 pr-50"
          />
          <button onClick={handleSubscribe} className="px-5 py-3 bg-[#1f2228] outline-0 rounded-sm text-[#d9dcde] cursor-pointer">
            Subscribe
          </button>
        </div>


        {msg && <p>{msg}</p>}
      </div>
    </div>
  );
};

export default Subscribe;