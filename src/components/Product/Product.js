import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    
    const {name , img , seller, price, stock , key} = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p>by: {seller}</p>
                <h2><span>$</span>{price}</h2>
                <p>only {stock} left in stock - <strong>order soon</strong></p>
                <button onClick={() => props.handleProduct(props.product)} className="btn"><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>
        </div>
    );
};

export default Product;