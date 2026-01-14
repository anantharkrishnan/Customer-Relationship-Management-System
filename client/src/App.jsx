import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CustomerPage from "./pages/CustomePage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/customerpage" element={<CustomerPage/>} />

        
        <Route
          path="/"
          element={
            <div className="p-6 text-center text-xl font-bold ">
              Welcome to CRM
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


