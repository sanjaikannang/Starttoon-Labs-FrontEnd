import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Homepage from "./Homepage";
import Landingpage from "./Landingpage";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={< Landingpage/>} />
        <Route path="/login" element={< Login/>} />
        <Route path="/signup" element={<Signup />} />  
        <Route path="/adminlogin" element={< AdminLogin/>} />
        <Route path="/admindashboard" element={<AdminDashboard />} />            
        <Route path="/homepage" element={<Homepage />} />            
      </Routes>
    </>
  );
}

export default App;
