import React from 'react';
import './Product.scss';
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { item } = props;

    return (
        <div className="product-container">
            <div className="product-container--circle">
            </div>
            <img src={item.img} alt="img-product" />
            <div className="product-container__list">
                <Link to={`/product/${item._id}`} >
                    <div className="product-container__list--item">
                        <ShoppingCartOutlined />
                    </div>
                </Link>
                <Link to={`/product/${item._id}`} >
                    <div className="product-container__list--item">
                        <SearchOutlined />
                    </div>
                </Link>
                <div className="product-container__list--item">
                    <FavoriteBorderOutlined />
                </div>
            </div>
        </div>
    )
}

export default Product
