import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    console.log(props);
    
    const {name , img , seller, price, stock} = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4>{name}</h4>
                <p>by: {seller}</p>
                <h2><span>$</span>{price}</h2>
                <p>only {stock} left in stock - <strong>order soon</strong></p>
                <button className="btn"><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>
        </div>
    );
};

export default Product;