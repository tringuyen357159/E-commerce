import React from 'react';
import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import './Footer.scss'

const Footer = () => {
    
    return (
        <div className="footer">
            <div className="footer__left">
                <h1>SHOP</h1>
                <p className="footer__left--desc">
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don’t look even slightly believable.
                </p>
                <div className="footer__left-social">
                    <div className="footer__left-social--item" style={{backgroundColor: '#3B5999'}}>
                        <Facebook />
                    </div>
                    <div className="footer__left-social--item" style={{backgroundColor: '#E4405F'}}>
                        <Instagram />
                    </div>
                    <div className="footer__left-social--item" style={{backgroundColor: '#55ACEE'}}>
                        <Twitter />
                    </div>
                    <div className="footer__left-social--item" style={{backgroundColor: '#E60023'}}>
                        <Pinterest />
                    </div>
                </div>
            </div>
            <div className="footer__center">
                <h3>Useful Links</h3>
                <ul>
                    <li>Home</li>
                    <li>Cart</li>
                    <li>Man Fashion</li>
                    <li>Woman Fashion</li>
                    <li>Accessories</li>
                    <li>My Account</li>
                    <li>Order Tracking</li>
                    <li>Wishlist</li>
                    <li>Wishlist</li>
                    <li>Terms</li>
                </ul>
            </div>
            <div className="footer__right">
                <h3>Contact</h3>
                <div className="footer__right-item">
                    <Room style={{marginRight:"10px"}}/> Đại Hoà, Đại Lộc,, Quảng Nam
                </div>
                <div className="footer__right-item">
                    <Phone style={{marginRight:"10px"}}/> 0783875574
                </div>
                <div className="footer__right-item">
                    <MailOutline style={{marginRight:"10px"}} /> tringuyen357159@gmail.com
                </div>
                <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="img-footer" />
            </div>
        </div>
    )
}

export default Footer
