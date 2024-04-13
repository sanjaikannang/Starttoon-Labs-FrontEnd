import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male"); // Default value is Male
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);

      const payload = {
        name,
        email,
        password,
        gender
      };

      const res = await fetch(`https://sanjaikannang-startoonlabs-back-end.onrender.com/user/signup`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setErr(data.message || "Error during signup. Please try again.");
      }
    } catch (error) {
    //   console.error("Error during signup:", error);
      setErr("Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-purple-500 font-bold">Startoon </span>
          Labs
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl">
            Login
          </Link>
          <Link to="/signup" className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl">
            Signup
          </Link>
        </div>
      </nav>

      <div className="bg-purple-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-4 space-y-4">
          <div className="bg-white p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center">
              Register
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-4 border"
            />
            <input
              type="email"
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
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="male">Male</label>
              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
                className="ml-4 mr-2"
              />
              <label htmlFor="female">Female</label>
            </div>
            <button
              className="w-full font-medium bg-purple-500 text-white py-2 relative rounded-3xl"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-7 w-7 border-t-2 border-b-2 border-white mr-2"></div>
                </div>
              )}
              {!loading ? "Register" : ""}
            </button>
            {err && (
              <p className="text-red-500 mt-2">
                {err}
              </p>
            )}
            <p className="text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-500">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
