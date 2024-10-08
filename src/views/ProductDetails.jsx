import { useParams } from 'react-router-dom';
import { Button, Chip, Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import { useState } from 'react';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';
import { toast } from 'sonner';
import { CheckCircle } from '@mui/icons-material';


const ProductDetail = () => {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const { id } = useParams();
    const product = useSelector(state => state.products.products.find(p => p.id === parseInt(id)));

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addItemToCart(product));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <Navbar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} ></Navbar>
            <CartDrawer open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} ></CartDrawer>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 py-8 mt-28 w-10/12 lg:w-8/12 mx-auto ' >
                <div className=' flex justify-center' >
                    <img src={product.image} alt={product.title} className='' />
                </div>
                <div className='md:p-8' >
                    <h1 className='text-3xl font-bold ' >{product.title}</h1>
                    <p className='text-base my-4 text-slate-700 ' >{product.description}</p>
                    <div className='mb-8 mt-8' >
                        <p className='mb-3' style={{ fontSize: '95%' , fontWeight:'600' }} >Category</p>
                        <Chip color='primary' variant='outlined' label={product.category} size='medium' ></Chip>
                    </div>
                    <p className='text-3xl tracking-tight text-gray-800 ' >${product.price}</p>
                    <div className='flex items-center my-2 mb-4' >
                        <p className='text-sm text-slate-600 mr-1' >{product.rating.rate}</p>
                        <Rating name="read-only" value={product.rating.rate} precision={0.5} size="medium" readOnly />
                        <p className='text-primary-600 ml-4 text-sm' style={{ fontWeight: '600' }} >{product.rating.count} reviews</p>
                    </div>
                    <Button variant="contained" color="primary" size="medium" className="rounded-3xl" onClick={() => { addToCartHandler(), toast.success(<div className='p-4 flex items-center ' ><CheckCircle className='mr-2' /> Added to Cart</div>) }}>
                        <AddShoppingCartRoundedIcon className='mr-2' /> Add to Cart
                    </Button>
                </div>
            </div>

            <section className="flex justify-center mx-auto bg-white py-8 mt-16 antialiased md:py-16 lg:w-8/12 " >



            </section>

            {/* <div>
            </div> */}
        </>
    );
};

export default ProductDetail;