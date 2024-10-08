// ProductItem.jsx
import { useDispatch } from 'react-redux';
import { Button, Rating } from '@mui/material';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../redux/cartSlice';
import { toast } from 'sonner';
import { CheckCircle } from '@mui/icons-material';

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addItemToCart(product));
    };

    return (
        <div className="group relative bg-white rounded shadow h-full flex flex-col justify-between">
            <div>
                <div>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </Link>
                    </div>
                </div>
                <div className="w-full mt-4 px-3 rounded flex justify-between">
                    <h3 className="text-sm text-gray-700">
                        <Link to={`/product/${product.id}`}>
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {product.title}
                        </Link>
                    </h3>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
            </div>
            <div className="m-2">
                <div className="w-full flex justify-between items-stretch mt-3 px-3 m-auto p-auto rounded">
                    <div className="flex flex-col">
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <Rating name="read-only" value={product.rating.rate} precision={0.5} size="small" readOnly />
                    </div>
                    <div className="my-auto py-auto">
                        <Button variant="contained" color="primary" size="small" className="rounded-3xl" onClick={() => { addToCartHandler(), toast.success(<div className='p-4 flex items-center ' ><CheckCircle className='mr-2' /> Added to Cart</div>) }}>
                            <AddShoppingCartRoundedIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;