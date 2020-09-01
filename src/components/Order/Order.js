import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Order = () => {

    const [cart, setCart] = useState([]);

    const removeProduct = (pdKey) => {
        const newCart = cart.filter(pd => pd.key !== pdKey);
        setCart(newCart);
        removeFromDatabaseCart(pdKey);
    }

    useEffect(() => {
        //carts
        const saveCart =  getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        // console.log(cartProduct);
        setCart(cartProduct);
        
    }, [])
    return (
        <div>
            <h1>order item: {cart.length}</h1>
            {
                cart.map( pd => <ReviewItem 
                    key={pd.key}
                    product={pd}
                    removeProduct= {removeProduct}>
                    </ReviewItem>)
            }
        </div>
    );
};

export default Order;