import React, { useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/databaseManager';

const Shop = () => {
    const shop1 = fakeData.slice(0,10);

    const [products, setProducts] = useState(shop1);

    const [cart , setCart] = useState([])

    const handleProduct = (product) => {
        const newCart = [...cart, product]
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === product.key)
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count)
    }
    

    return (
        <div className="product-container">
            <div className="shop-container">
               {
                    products.map(pd => <Product key={pd.key} showAddToCart={true} product={pd} handleProduct={handleProduct}></Product>)
               }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;