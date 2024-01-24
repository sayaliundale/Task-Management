import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard1 from "./Components/Dashboard1";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/sign" />} />
            <Route path="/sign" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard1" element={<Dashboard1 />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
