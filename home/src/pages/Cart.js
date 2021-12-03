import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import './Cart.scss'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
import { useDispatch } from 'react-redux';


const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();
    const KEY = process.env.REACT_APP_STRIPE;
    const dispatch = useDispatch()

    const handleShopping = () => {
        history.push('/');
    }

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:5000/api/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });
                dispatch({
                    type: 'ORDER_SUCCESS'
                })
                history.push("/success", {
                    stripeData: res.data,
                    products: cart 
                });
            } catch(err) {
                console.log(err);
            }
        };
        stripeToken && cart.total > 0 && makeRequest();
    }, [stripeToken, cart.total, history]);

    return (
        <div className="cart">
            <Navbar />
            <Announcement />
            <div className="cart-container">
                <h1 className="cart-container--title">YOUR BAG</h1>
                <div className="cart-container__top">
                    <button 
                        className="cart-container__top--btn" 
                        style={{backgroundColor: 'transparent'}}
                        onClick={handleShopping}
                    >CONTINUE SHOPPING</button>
                    <div className="cart-container__top-text">
                        <span>Shopping Bag({cart.quantity})</span>
                    </div>
                    <button 
                        className="cart-container__top--btn" 
                        style={{border: 'none', backgroundColor: 'black', color: 'white'}}
                    >CHECKOUT NOW</button>
                </div>
                <div className="cart-container__bottom">
                  
                    <div className="cart-container__bottom-info">
                        {cart.products && cart.products.length > 0 && cart.products.map((item) => (
                            <div className="cart-container__bottom-info-list">
                                <div className="cart-container__bottom-info-list-item">
                                    <img src={item.img} alt=""/>
                                    <div className="cart-container__bottom-info-list-item-detail">
                                        <span>
                                            <b>Product:</b> {item.title}
                                        </span>
                                        <span>
                                            <b>ID:</b> {item._id}
                                        </span>
                                        <span style={{display: 'flex', flexDirection: 'row{'}}>
                                            <b>Color:</b> <ProductColor color={item.color} /> 
                                        </span>
                                        <span>
                                            <b>Size:</b> {item.size}
                                        </span>
                                    </div>
                                </div>
                                <div className="cart-container__bottom-info-list-price">
                                    <div className="cart-container__bottom-info-list-price-action">
                                        <Add  />
                                        <div className="cart-container__bottom-info-list-price-action--quantity">{item.quantity}</div>
                                        <Remove />
                                    </div>
                                    <div className="cart-container__bottom-info-list-price--detail">$ {item.price * item.quantity}</div>
                                </div>
                            </div>
                        ))}
                        <hr />
                    </div>
                    <div className="cart-container__bottom-summary">
                        <h1 className="cart-container__bottom-summary--title">ORDER SUMMARY</h1>
                        <div className="cart-container__bottom-summary-item">
                            <span>Subtotal</span>
                            <span>$ {cart.total}</span>
                        </div>
                        <div className="cart-container__bottom-summary-item">
                            <span>Estimated Shipping</span>
                            <span>$ 5.90</span>
                        </div>
                        <div className="cart-container__bottom-summary-item">
                            <span>Shipping Discount</span>
                            <span>$ -5.90</span>
                        </div>
                        <div className="cart-container__bottom-summary-item" style={{fontWeight: '500', fontSize: '24px'}}>
                            <span>Total</span>
                            <span>$ {cart.total}</span>
                        </div>
                        <StripeCheckout
                            name="Shop"
                            image="https://yt3.ggpht.com/iLfumvEjWHdtM-VCPg3X1qcb75Tj_YsIjmNzbZnDCz9_jSvdRcdYwmtYUrGKE9bcDpd7qZjd=s176-c-k-c0x00ffffff-no-rj"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <button className="cart-container__bottom-summary--btn">CHECKOUT NOW</button>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart
