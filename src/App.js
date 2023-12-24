import "./App.css";
import Loggedinpage from "./components/loggedinpage";
import Login from "./components/login";
import Reset from "./components/reset";
import NewPassword from "./components/new_password";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/loggedin" element={<Loggedinpage />} />
          <Route path="/reset" element={<Reset />} />
        <Route path="/new-password/:uniqueString" element={<NewPassword />} />
        {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
