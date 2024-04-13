import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async () => {
    setLoading(true);

    const payload = {
      email,
      password,
    };

    try {
      const res = await fetch(`https://sanjaikannang-startoonlabs-back-end.onrender.com/user/admin/login`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        // Save token to local storage
        localStorage.setItem("token", data.token);

        // If login is successful, navigate to admin dashboard page
        navigate('/admindashboard');
      } else {
        setErr(
          data.message ||
            "Invalid credentials. Please check your email and password!"
        );
      }
    } catch (error) {
      setErr("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-purple-600 font-bold">Startoon </span>
          Labs
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </nav>

      <div className="bg-purple-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
              Admin Login
            </h2>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border"
            />
            <br />
            <br />
            <button
              className="w-full font-medium bg-purple-500 text-white py-2 relative rounded-3xl"
              onClick={handleAdminLogin}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white mr-2"></div>
                </div>
              ) : (
                "Login "
              )}
            </button>
            {err && <p className="text-red-500 mt-2">{err}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;