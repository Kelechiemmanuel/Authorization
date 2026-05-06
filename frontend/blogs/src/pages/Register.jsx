import { useState } from "react";
import API from '../API'
import { useNavigate } from "react-router-dom";

const Register = () => {
 const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", form);
      setSuccess("Account created successfully");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  return (
    <div className="p-20">
      <h2>Register</h2>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;