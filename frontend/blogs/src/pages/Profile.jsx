import { useEffect, useState } from "react";
import API from "../API";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/profile")
      .then((res) => setUser(res.data))
      .catch(console.log);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-20">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;