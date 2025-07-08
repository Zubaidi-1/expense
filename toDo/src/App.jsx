import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "../pages/Landing";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import VerifyOtp from "../pages/VerifyOtp";
import UserData from "../pages/UserData";
import ForgotPassword from "../pages/ForgotPassword";
import HomePage from "../pages/HomePage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/verifyOTP" element={<VerifyOtp />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/forgotPass" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
