import React, { useState, useEffect } from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const shop1 = fakeData.slice(0,10);

    const [products, setProducts] = useState(shop1);

    const [cart , setCart] = useState([])

    useEffect(() => {
        //carts
        const saveCart =  getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const previousCart = productKeys.map(exitingKey => {
            const product = fakeData.find(product => product.key === exitingKey);
            product.quantity = saveCart[exitingKey];
            return product;
        });
        setCart(previousCart);
    }, []);

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
                <Cart cart={cart}>
                    <Link to="/order">
                        <button className="btn-review">Review Order</button>   
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;