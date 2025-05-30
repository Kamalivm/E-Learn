import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Learning from "./pages/Learning";
import Dashboard from "./components/Dashboard";
import EasyLevel from "./components/EasyLevel";
import MediumLevel from "./components/MediumLevel";
import Rewards from "./components/Rewards";
import NumberTest from "./pages/NumberTest";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Notification from "./components/Notification";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AdvancedLevel from "./components/AdvancedLevel";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/easy" element={<EasyLevel />} />
        <Route path="/hard" element={<HardLevel />} />
        <Route path="/medium" element={<MediumLevel />} />
        <Route path="/advanced" element={<AdvancedLevel />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/number-test" element={<NumberTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sand-writing" element={<SandRouteApp />} />
    
      </Routes>
    </Router>
  );
}

export default App;