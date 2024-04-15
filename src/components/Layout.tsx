import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/Button";
import { CalendarClock, Home as HomeIcon, LineChart, Smile } from "lucide-react";

export default function Layout() {
    return (
        <div>
            <Outlet />
            <nav>
                <ul className="flex list-none p-0">
                    <li className="mr-4">
                        <Button asChild>
                            <Link to="/">
                                <HomeIcon />
                            </Link>
                        </Button>
                    </li>
                    <li className="mr-4">
                        <Link to="/infos">
                            <LineChart />
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to="/calendar">
                            <CalendarClock />
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link to="/profile">
                            <Smile />
                        </Link>
                    </li>
                </ul>
            </nav>
            <hr />
        </div>
    );
}
