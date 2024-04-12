import React from "react";
import {Link, Outlet} from "react-router-dom";
import {Button} from "./ui/Button";
import {Home as HomeIcon} from "lucide-react";

export default function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Button asChild>
                            <Link to="/"><HomeIcon /></Link>
                        </Button>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </nav>

            <hr/>

            <Outlet/>
        </div>
    );
}