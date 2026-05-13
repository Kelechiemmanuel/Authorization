import { useState } from "react";
import { motion } from "framer-motion";
import API from "../API";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      setMsg("Please enter an email");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/subscriptions", { email });

      setMsg(res.data.message || "Subscribed successfully");
      setEmail("");
    } catch (err) {
      setMsg(err.response?.data?.error || "Subscription failed");
    } finally {
      setLoading(false);

      setTimeout(() => setMsg(""), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 md:px-14 lg:px-40 my-16"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-[#d9dcde] p-8 rounded-lg bg-white shadow-sm"
      >
        <h1 className="text-sm font-bold text-[#5c6166] mb-3">
          Stay Informed
        </h1>

        <p className="text-sm leading-7 text-[#5c6166]">
          Subscribe to receive updates, new articles, and important news directly in your inbox.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-[#1f2228]">
          Join our newsletter
        </h3>

        <div className="flex items-center mt-5 border border-[#e3e5e6] rounded-md overflow-hidden bg-white shadow-sm">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 outline-none text-sm"
          />

          <motion.button
            onClick={handleSubscribe}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-3 bg-[#1f2228] text-white text-sm hover:opacity-90 transition"
          >
            {loading ? "..." : "Subscribe"}
          </motion.button>
        </div>

        {msg && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-[#1f2228]"
          >
            {msg}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Subscribe;