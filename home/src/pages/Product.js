import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Newsletter from '../components/NewsLatter'
import Footer from '../components/Footer'
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import './Product.scss'
import { useLocation } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const Product = (props) => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
                if(res && res.data && res.data.success === true){
                    setProduct(res.data.product);
                }
            } catch (err) {
                console.log(err);
            }
        };

        getProduct();
    }, [id]);
    
    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        dispatch({
            type: 'ADD_PRODUCT_SUCCESS',
            payload: { ...product, quantity, color, size }
        });
        toast.success("Cart successfuly")
    };

    return (
        <div className="pageProduct">
            <Navbar />
            <Announcement />
            <div className="pageProduct-container">
                <div className="pageProduct-container--img">
                    <img src={product.img} alt=""/>
                </div>
                <div className="pageProduct-container__info">
                    <h1 className="pageProduct-container__info--title">{product.title}</h1>
                    <p className="pageProduct-container__info--desc">
                        {product.desc}
                    </p>
                    <span className="pageProduct-container__info--price">$ {product.price}</span>
                    <div className="pageProduct-container__info-filter">
                        <div className="pageProduct-container__info-filter-color">
                            <span className="pageProduct-container__info-filter-color--span">Color</span>
                            {product && product.color && product.color.map((item) => (
                                <FilterColor color={item} key={item} onClick={() => setColor(item)} />
                            ))}
                        </div>
                        <div className="pageProduct-container__info-filter-size">
                            <span className="pageProduct-container__info-filter-color--span">Size</span>
                            <select onChange={(e) => setSize(e.target.value)}>
                                <option value="">Choose</option>
                                {product && product.size && product.size.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="pageProduct-container__info-action">
                        <div className="pageProduct-container__info-action-quantity">
                            <span onClick={() => handleQuantity("dec")}><Remove /></span>
                            <span className="pageProduct-container__info-action-quantity--span">{quantity}</span>
                            <span onClick={() => handleQuantity("inc")}><Add  /></span>
                        </div>
                        <button 
                            className="pageProduct-container__info-action--btn"
                            onClick={handleClick}
                        >ADD TO CART</button>
                    </div>
                </div>
            </div>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Product
