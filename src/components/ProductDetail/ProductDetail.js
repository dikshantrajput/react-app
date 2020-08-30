import React from 'react';
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);

    console.log(product);
    
    
    return (
        <div>
            <h1>Product Detail coming Soon </h1>
            <Product product={product}></Product>
        </div>
    );
};

export default ProductDetail;