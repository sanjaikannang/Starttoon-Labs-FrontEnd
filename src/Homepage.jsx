import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("https://sanjaikannang-startoonlabs-back-end.onrender.com/user/specific-user", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className="text-purple-600 font-bold">Startoon </span>
          Labs
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-white bg-purple-500 font-medium px-4 py-2 rounded-3xl"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl text-purple-500 font-bold mb-4 flex justify-center py-2">
          User Details
        </h2>
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : userData ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-purple-200">
                  <th className="px-4 py-2">Attribute</th>
                  <th className="px-4 py-2">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userData).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2">{key}</td>
                    <td className="border px-4 py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No user data available</p>
        )}
      </div>
    </>
  );
};

export default Homepage;
