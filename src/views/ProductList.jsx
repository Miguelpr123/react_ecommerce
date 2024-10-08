import ProductItem from '../components/ProductItem';
import api from '../api/base';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import Sidebar from '../components/Sidebar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCategories, setProducts } from '../redux/productsSlice';
import { toast } from 'sonner';
import { Error } from '@mui/icons-material';
import { FilterAlt } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import FiltersDialog from '../components/FiltersDialog';
// import InlineCart from '../components/InlineCart';


const ProductList = () => {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const { filteredProducts } = useSelector((state) => state.products)
    const dispatch = useDispatch()

    useEffect(() => {
        api.get('/products')
            .then((response) => {
                dispatch(setProducts(response.data))
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                toast.error(<div className='p-4 flex items-center ' ><Error className='mr-2' /> Error fetching data</div>)
            });
        api.get('/products/categories')
            .then((response) => {
                dispatch(setCategories(response.data));
            })
            .catch((error) => {
                console.error('Error fetching categories: ', error);
                toast.error(<div className='p-4 flex items-center ' ><Error className='mr-2' /> Error fetching categories</div>)
            });
    }, [dispatch])

    // Filters
    const [openFilterScroll, setOpenFilterScroll] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const handleClickFiltersOpen = (scrollType) => () => {
        setOpenFilterScroll(true);
        setScroll(scrollType);
    };
    const { activeFiltersCount } = useSelector((state) => state.products);

    return (
        <>
            <Navbar open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} ></Navbar>

            <div className="grid grid-cols-1 lg:grid-cols-12 ">

                <Sidebar></Sidebar>
                <CartDrawer open={open} setOpen={setOpen} toggleDrawer={toggleDrawer} ></CartDrawer>

                {/* PRODUCTS */}
                <div className="lg:col-span-10 bg-gray-50 ">

                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className='flex justify-between items-center ' >
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 pl-3" style={{ borderLeft: '5px solid var(--color-primary)' }} >Products in Stock</h2>
                            <IconButton id='FilterButton' onClick={handleClickFiltersOpen('paper')} >
                                <Badge badgeContent={activeFiltersCount} color="primary" >
                                    <FilterAlt />
                                </Badge>
                            </IconButton>
                            <FiltersDialog open={openFilterScroll} scroll={scroll} setOpen={setOpenFilterScroll} handleClickFiltersOpen={handleClickFiltersOpen} />
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">

                            {filteredProducts.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}

                        </div>
                    </div>
                </div>



            </div>


        </>
    )
}

export default ProductList;