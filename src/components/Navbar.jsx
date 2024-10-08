import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { Badge, Stack } from '@mui/material';

import { dividerClasses } from '@mui/material/Divider';
import { useSelector } from 'react-redux';
import { Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Navbar({ open, setOpen, toggleDrawer }) {

    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" variant='outlined' elevation={0} sx={{ background: '#fff' }} color='default' >
                    <Toolbar className='flex justify-between ' >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: 1,
                            '& svg': {
                                m: 1,
                            },
                            [`& .${dividerClasses.root}`]: {
                                mx: 9.8,    // TODO: Esto no va estatico asi ...
                            },
                        }} >
                            <NavLink to="/" >
                                <Box className="flex items-center " >
                                    <img src="./../../static/img/logo1.png" alt="Logo image" style={{ width: '50px' }} />
                                    <Box className='flex flex-col' >
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1, mr: 6, my: 0, fontFamily: 'Abalone', fontSize: '150%' }}>
                                            Shopper<span style={{ color: '#4285F4' }}>24</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </NavLink>
                            {/* <Divider orientation='vertical' flexItem ></Divider> */}
                        </Box>
                        <Stack direction='row' >
                            <NavLink to="/" className='hidden sm:block' >
                                <Button color="inherit" >
                                    Products
                                </Button>
                            </NavLink>
                            <Link to="/" className=' sm:hidden'  >
                                <IconButton className=' sm:hidden' >
                                    <Home />
                                </IconButton>
                            </Link>
                            <IconButton onClick={toggleDrawer(true)} >
                                <Badge badgeContent={totalQuantity} color="primary">
                                    <ShoppingCartIcon ></ShoppingCartIcon>
                                </Badge>
                            </IconButton>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );
}
