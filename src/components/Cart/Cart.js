import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    const total = cart.reduce((total , prd) => total + prd.price , 0);

    //Other Way
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const prd = cart[i];
    //     total = total + prd.price;
    // }
    let shipping = 0;

    if(total > 35){
        shipping = 0;
    } else if(total > 15){
        shipping = 4.99;
    }
    
    return (
        <div className="cart-inner">
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <table>
                <tbody>
                    <tr>
                        <td>Items:</td>
                        <td>${total}</td>
                    </tr>
                    <tr>
                        <td>Shipping &amp; Handling:</td>
                        <td>${shipping}</td>
                    </tr>
                    <tr>
                        <td>Total before tax:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Estimated Tax:</td>
                        <td></td>
                    </tr>
                    <tr class="total-row">
                        <td>Order Total:</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>            
        </div>
    );
};

export default Cart;