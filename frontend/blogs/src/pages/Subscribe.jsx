import { useState } from "react";
import { motion } from "framer-motion";
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

      setMsg(err.response?.data?.error || "Something went wrong");
    }

    setTimeout(() => setMsg(""), 3000);
  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 60 }}

      whileInView={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.7 }}

      viewport={{ once: true, amount: 0.2 }}

      className="
        grid grid-cols-1 place-items-center
        w-full gap-10 my-10 px-5
        md:grid-cols-1 md:px-14
        lg:grid-cols-2 lg:px-39
      "
    >

      <motion.div
        initial={{ opacity: 0, x: -80 }}

        whileInView={{ opacity: 1, x: 0 }}

        transition={{
          duration: 0.7,
          delay: 0.1,
        }}

        viewport={{
          once: false,
          amount: 0.2,
        }}

        className='
          border border-[#d9dcde]
          text-[#1f2228]
          p-10
          rounded-sm
          transition
          bg-white
        '
      >

        <h1 className="text-[13px] font-bold mb-3">
          Stay Informed with Early Updates!
        </h1>

        <p className='text-[14px] leading-8 text-[#5c6166]'>
          Subscribe to our newsletter and receive the latest
          theme updates and important news directly to your inbox.
        </p>

      </motion.div>

      {/* RIGHT FORM */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}

        whileInView={{ opacity: 1, x: 0 }}

        transition={{
          duration: 0.7,
          delay: 0.2,
        }}

        viewport={{
          once: false,
          amount: 0.2,
        }}

        className="w-full"
      >

        <motion.h3
          initial={{ opacity: 0, y: 20 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          viewport={{
            once: false,
            amount: 0.2,
          }}

          className="text-[#1f2228] font-bold text-xl"
        >
          Subscribe to our blog
        </motion.h3>

        <motion.div
          whileFocus={{ scale: 1.01 }}

          className="
            flex border border-[#e3e5e6]
            w-full p-2 rounded-sm
            lg:pl-5 md:pl-5 pl-2
            mt-5
            bg-white
          "
        >

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              outline-0
              flex-1
              bg-transparent
              text-[#1f2228]
            "
          />

          <motion.button
            onClick={handleSubscribe}

            whileTap={{ scale: 0.95 }}

            whileHover={{
              scale: 1.03,
            }}

            className="
              px-5 py-3
              bg-[#1f2228]
              rounded-sm
              text-[#d9dcde]
              cursor-pointer
            "
          >
            Subscribe
          </motion.button>

        </motion.div>

        {msg && (

          <motion.p
            initial={{ opacity: 0, y: 10 }}

            animate={{ opacity: 1, y: 0 }}

            className="mt-4 text-sm text-[#1f2228]"
          >
            {msg}
          </motion.p>

        )}

      </motion.div>

    </motion.div>
  );
};

export default Subscribe;