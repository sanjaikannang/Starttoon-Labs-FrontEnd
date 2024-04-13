import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const res = await fetch("https://sanjaikannang-startoonlabs-back-end.onrender.com/user/admin/users", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          setError(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Generate data for the bar chart based on user login count by date
  const generateChartData = () => {
    const chartData = userData.map((user) => ({
      name: user.name,
      count: user.count,
    }));
    return chartData;
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
        <h2 className="text-2xl text-purple-500 font-bold mb-4 flex justify-center">
          Admin Dashboard
        </h2>
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto sm:w-full">
                <thead>
                  <tr className="bg-purple-200">
                    <th className="border px-2 py-1">S.No</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Email</th>
                    <th className="border px-2 py-1">Count</th>
                    <th className="border px-2 py-1">Gender</th>
                    <th className="border px-2 py-1">Last Login Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={user._id}>
                      <td className="border px-2 py-1">{index + 1}</td>
                      <td className="border px-2 py-1">{user.name}</td>
                      <td className="border px-2 py-1">{user.email}</td>
                      <td className="border px-2 py-1">{user.count}</td>
                      <td className="border px-2 py-1">{user.gender}</td>
                      <td className="border px-2 py-1">
                        {formatDate(user.lastLoginDate)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />

            <div className="mt-8">
              <h2 className="text-2xl text-purple-500 font-bold mb-4 flex justify-center">
                User Login Count Chart
              </h2>
              <br />
              <div
                className="chart-container"
                style={{
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  overflow: "hidden",
                }}
              >
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={generateChartData()}
                    margin={{
                      top: 30,
                      right: 40,
                      left: 0,
                      bottom: 30,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 50]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      fill="#8884d8"
                      activeBar={<Rectangle stroke="blue" />}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
      <br />
      <br />
    </>
  );
};

export default AdminDashboard;
