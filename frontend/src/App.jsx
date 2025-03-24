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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/easy" element={<EasyLevel />} />
        <Route path="/medium" element={<MediumLevel />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/number-test" element={<NumberTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;