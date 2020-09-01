import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';

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
        <div className="product-container">
            <div className="shop-container">
                <div>
                    <h3>order item: {cart.length}</h3>
                        {
                            cart.map( pd => <ReviewItem 
                                key={pd.key}
                                product={pd}
                                removeProduct= {removeProduct}>
                                </ReviewItem>)
                        }
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Order;