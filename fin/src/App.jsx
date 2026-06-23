import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Dashboards from "./pages/Dashboards";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboards />} />
        <Route path="/transactions" element={<Transactions />} />
<Route path="/insights" element={<Insights />} />
<Route path="/profile" element={<Profile />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;