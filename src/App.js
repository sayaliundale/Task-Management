import {BrowserRouter as Router , Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./Components/Login";
import Signin from "./Components/Signin";
import Home from "./Components/Home";

function App() {
  return (
   <>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path ="/sign" element={<Signin/>}></Route>
          <Route path ="/Home" element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
   </>
  );
}

export default App;
