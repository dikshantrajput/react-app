import React, { useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const shop1 = fakeData.slice(0,10);

    const [products, setProducts] = useState(shop1);

    const [cart , setCart] = useState([])

    const handleProduct = (product) => {
        const newCart = [...cart, product]
        setCart(newCart)     
    }
    

    return (
        <div className="product-container">
            <div className="shop-container">
               {
                    products.map(pd => <Product product={pd} handleProduct={handleProduct}></Product>)
               }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;