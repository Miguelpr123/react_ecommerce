import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './views/ProductList';
import ShoppingCart from './views/ShoppingCart';
import './styles/output.css';
import './styles/styles.css';
import ProductDetail from './views/ProductDetails';
import { Toaster } from 'sonner'

function App() {
    return (
        <>
            <Toaster closeButton richColors position="bottom-left" />
            <Routes>
                <Route exact path="/" element={<ProductList></ProductList>} />
                <Route path="/cart" element={<ShoppingCart></ShoppingCart>} />
                <Route
                    path='/*'
                    element={<Navigate to='/'></Navigate>}
                ></Route>
                <Route path="/product/:id" element={<ProductDetail></ProductDetail>} />
            </Routes>
        </>
    );
}


export default App;