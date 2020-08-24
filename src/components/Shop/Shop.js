import React, { useState } from 'react';
import './Shop.css'
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const Shop = () => {
    const shop1 = fakeData.slice(0,10);

    const [products, setProducts] = useState(shop1);
    

    return (
        <div className="product-container">
            <div className="shop-container">
               {
                    products.map(pd => <Product product={pd}></Product>)
               }
            </div>
            <div className="cart-container">
                <p>This is shop area</p>
            </div>
        </div>
    );
};

export default Shop;