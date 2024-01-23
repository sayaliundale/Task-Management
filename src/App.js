import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Dashboard1 from "./Components/Dashboard1";
// import ForgotPassword from "./Components/ForgetPassword";

function App() {
  return (
   <>
    <div className="App">
      <Router>
        <Routes>
        <Route path ="/Home" element={<Home/>}></Route>
        <Route path ="/sign" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path ="/dashboard" element= {<Dashboard/>}></Route>
        <Route path ="/dashboard1" element= {<Dashboard1/>}></Route>

          {/* 
          <Route path="forget-password" element={<ForgotPassword/>}></Route>
           */}
        </Routes>
      </Router>
    </div>
   </>
  );
}

export default App;
