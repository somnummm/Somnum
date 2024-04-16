import { Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Sleep from "./pages/Sleep";
import Dashboard from "./pages/Dashboard";
import Night from "./pages/Night";
import "./Profile.css";
import "./App.css";
import SignUp from "./pages/SignUp.jsx";
import {unAuthGuard} from "./guards/authGuard.js";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} onEnter={unAuthGuard}/>
            <Route path="/register" element={<SignUp/>} onEnter={unAuthGuard}/>
            <Route path="/" element={<Navbar/>}>
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="sleep" element={<Sleep/>}/>
                <Route path="night" element={<Night/>}/>
                <Route path="profile" element={<Profile/>}/>
            </Route>
        </Routes>
    );
}

export default App;
