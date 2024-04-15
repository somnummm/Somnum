import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {Outlet} from "react-router-dom";

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
                    <BottomNavigationAction label="Recents" icon={<AccountCircleIcon/>}/>
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction label="Archive" icon={<ArchiveIcon/>}/>
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
//     {/*<Outlet/>*/
//     }
//     {/*<BottomNavigation*/
//     }
//     {/*    showLabels*/
//     }
//     {/*    value={value}*/
//     }
//     {/*    onChange={(event, newValue) => {*/
//     }
//     {/*        setValue(newValue);*/
//     }
//     {/*    }}*/
//     }
//     {/*>*/
//     }
//     {/*    <BottomNavigationAction label="Home" icon={<HomeIcon/>}>*/
//     }
//     {/*        <Link to={'/'}></Link>*/
//     }
//     {/*    </BottomNavigationAction>*/
//     }
//     {/*    <BottomNavigationAction label="Charts" icon={<LineChart/>}>*/
//     }
//     {/*        <Link to={'/charts'}></Link>*/
//     }
//     {/*    </BottomNavigationAction>*/
//     }
//     {/*    <BottomNavigationAction label="Calendar" icon={<CalendarClock/>}/>*/
//     }
//     {/*    <BottomNavigationAction label="Profile" icon={<Smile/>}/>*/
//     }
// //     {/*</BottomNavigation>*/
// //     }
// // )
// //     ;
// // }
