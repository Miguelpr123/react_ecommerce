import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, IconButton, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../redux/cartSlice';
import { Close } from '@mui/icons-material';


export default function CartDrawer({ open, setOpen, toggleDrawer }) {
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice);
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeItemFromCart(id));
    };


    const DrawerList = (
        <Box sx={{ paddingBottom: 12 }} id="DrawerList" role="presentation" >
            <div className='p-4 text-end ' >
                <IconButton onClick={toggleDrawer(false)}>
                    <Close />
                </IconButton>
            </div>
            <div className="mx-auto max-w-2xl px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-12 lg:max-w-7xl lg:px-8" >
                <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-primary)' }} >Your Cart ({totalQuantity}) </h2>
            </div>
            <div className='mx-auto flex flex-col justify-center items-start ' style={{ width: '85%' }} >
                {cartItems.map(item => (
                    <div key={item.id} className='my-3 w-full p-2 pb-3 flex justify-between items-center ' style={{ borderBottom: '1px solid #ccc ' }} >
                        <div>
                            <div className='mr-5' style={{ width: '30px' }} >
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>
                            <div>
                                <strong className='text-md' >{item.title}</strong>
                                <div>
                                    <span className='mr-4 text-primary-600 text-sm ' ><strong>{item.quantity}x</strong></span>
                                    <span className='mr-2 text-slate-400 text-sm' >${item.price.toFixed(2)}</span>
                                    <span className='mr-1 text-slate-600 text-md' ><strong>${item.totalPrice.toFixed(2)}</strong></span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <IconButton onClick={() => removeFromCartHandler(item.id)} >
                                <Close />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mx-auto flex justify-between items-center mt-4 ' style={{ width: '85%' }} >
                <Typography variant='body1' >Order Subtotal</Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }} >${totalPrice.toFixed(2)}</Typography>
            </div>

            <div className='w-full mx-auto flex items-center justify-center text-center p-4 my-8 bg-slate-100' style={{ width: '85%' }} >
                <LocalShippingIcon className='mr-1' />
                <p className='text-sm' >Free delivery on <strong>all orders</strong> today!</p>
            </div>

            <div className='w-full mx-auto' style={{ width: '85%' }} >
                <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary' className='w-full' >Confirm Order</Button>
                </NavLink>
            </div>

        </Box>
    );

    return (
        <>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' >
                {DrawerList}
            </Drawer>
        </>
    );
}
