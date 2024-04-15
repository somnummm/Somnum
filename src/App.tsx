import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export default function App() {
    return (
        <div>
            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="about" element={<About/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </div>
    );
}