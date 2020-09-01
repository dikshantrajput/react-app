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
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key) 
            newCart = [...others , sameProduct]
        } else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
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