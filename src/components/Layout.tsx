import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Paper from '@mui/material/Paper';
import {Link, Outlet} from "react-router-dom";
import About from "../pages/About";

export default function Layout() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    }, [value]);

    return (
        <Box sx={{pb: 7}} ref={ref}>
            <CssBaseline/>
            <Outlet/>
            <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Profile" icon={<AccountCircleIcon/>} component={Link} to="/profile"/>
                    <BottomNavigationAction label="Program" icon={<CalendarMonthIcon/>} component={Link}
                                            to="/calendar"/>
                    <BottomNavigationAction label="Data" icon={<BarChartIcon/>} component={Link} to="/dashboard"/>
                    <BottomNavigationAction label="Home" icon={<HomeIcon/>} component={Link} to="/"/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
