import React from 'react';

const ReviewItem = (props) => {

    const{name, quantity, key} = props.product;
    return (
        <div className="review-item">
            <div className="product">
                <div>
                    <h4>{name}</h4>
                    <p>Quantity:{quantity}</p>
                    <button onClick={() => props.removeProduct(key)} className="btn">Remove Item</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;