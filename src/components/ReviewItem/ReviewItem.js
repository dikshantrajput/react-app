import React from 'react';

const ReviewItem = (props) => {

    const{name, quantity, key, price} = props.product;
    return (
        <div className="review-item">
            <div className="product">
                <div>
                    <h4>{name}</h4>
                    <p>Quantity:{quantity}</p>
                    <h3><small>Item Price: ${price}</small></h3>
                    <button onClick={() => props.removeProduct(key)} className="btn">Remove Item</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;