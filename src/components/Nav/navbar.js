import { Link, useNavigate} from "react-router-dom"
import { useState,useEffect } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../imgs/IciraLogo.ico'
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const NavBar=()=>{
    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
 
    const [user, setUser] = useState([])
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const navigate = useNavigate()
    //navigate("/login")
    
    useEffect(()=>{
        fetch(`${api}/IciraUsers/${currentUser.id}`)
        .then(response =>response.json())
        .then((data) => {
            setUser(data)
        })
    },[]
    )

//     const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
    const iciraTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main:"#308cab",
          },
          secondary:{
            main: '#1976d2'

          }
        },
      });

      const appBarLabel=(label, route)=> {
        return (
            <Button
            key={label}
            onClick={()=>{navigate(route)}}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {label}
          </Button>             
        );
        
      }

    const userProfileNav =(e)=>{
        e.preventDefault()
        navigate("/myprofile")
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        // navigate(e)
        };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    //   function stringToColor(string) {
    //     let hash = 0;
    //     let i;
      
    //     /* eslint-disable no-bitwise */
    //     for (i = 0; i < string.length; i += 1) {
    //       hash = string.charCodeAt(i) + ((hash << 5) - hash);
    //     }
      
    //     let color = '#';
      
    //     for (i = 0; i < 3; i += 1) {
    //       const value = (hash >> (i * 8)) & 0xff;
    //       color += `00${value.toString(16)}`.slice(-2);
    //     }
    //     /* eslint-enable no-bitwise */
      
    //     return color;
    //   }

    //   function stringAvatar(name) {
    //     return {
    //       sx: {
    //         bgcolor: stringToColor(name),
    //       },
    //       children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    //     };
    //   }
      
      const menuAction =(e)=>{
        navigate(e)
        handleCloseNavMenu()

      }


      const appBarMenu = (label, route) => {
        return (<MenuItem key={label} onClick={()=>{menuAction(route)}}>
            <Typography textAlign="center" variant="h6" noWrap component="a">
              {label}
            </Typography>
          </MenuItem>
        );
      };

 
 return <> <AppBar position="static" color="primary">
       <Container maxWidth="xl">
         <Toolbar disableGutters>
           {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
           <Typography
             variant="h6"
             noWrap
             component="a"
             href="/"
             sx={{
               mr: 2,
               display: { xs: 'none', md: 'flex' },
               fontFamily: 'monospace',
               fontWeight: 700,
               letterSpacing: '.3rem',
               color: 'inherit',
               textDecoration: 'none',
             }}
           >
             ICIRA
           </Typography>
 
           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
             <IconButton
               size="large"
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleOpenNavMenu}
               color="inherit"
             >
               <MenuIcon />
             </IconButton>
             <Menu
               id="menu-appbar"
               anchorEl={anchorElNav}
               anchorOrigin={{
                 vertical: 'bottom',
                 horizontal: 'left',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'left',
               }}
               open={Boolean(anchorElNav)}
               onClose={handleCloseNavMenu}
               sx={{
                 display: { xs: 'block', md: 'none' },
               }}
             > {appBarMenu(`Welcom ${user.fullName}`, "")}
               {appBarMenu("Report Builder", "/builder")}
               {appBarMenu("My Reports", "myreports")}

             </Menu>
           </Box>
           {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
           <Typography
             variant="h5"
             noWrap
             component="a"
             href=""
             sx={{
               mr: 2,
               display: { xs: 'flex', md: 'none' },
               flexGrow: 1,
               fontFamily: 'monospace',
               fontWeight: 700,
               letterSpacing: '.3rem',
               color: 'inherit',
               textDecoration: 'none',
             }}
           >
             ICIRA
           </Typography>
           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
             
              {appBarLabel("Report Builder", "/builder")}
              {appBarLabel("My Reports", "myreports")}
            
           </Box>
 
           <Box sx={{ flexGrow: 0 }}>
             <Tooltip title="Open settings">
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                 <Avatar alt={user.fullName}  />
                 {/* {...stringAvatar(user.fullName)} */}
               </IconButton>
             </Tooltip>
             <Menu
               sx={{ mt: '45px' }}
               id="menu-appbar"
               anchorEl={anchorElUser}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorElUser)}
               onClose={handleCloseUserMenu}
             >
               {appBarMenu("My Profile", "myprofile")}
             </Menu>
           </Box>
         </Toolbar>
       </Container>
     </AppBar>       
</>
}