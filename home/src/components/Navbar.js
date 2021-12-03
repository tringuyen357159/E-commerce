import React from 'react';
import './Navbar.scss';
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity);

    return (
        <div className="nav-container">
            <div className="nav-container__wrapper">
                <div className="nav-container__wrapper-left">
                    <span className="nav-container__wrapper--language">
                        EN
                    </span>
                    <div className="nav-container__wrapper-search">
                        <input placeholder="Search" />
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <div className="nav-container__wrapper-center">
                    <Link to="/">
                        <h1>SHOP</h1>
                    </Link>
                </div>
                <div className="nav-container__wrapper-right">
                    <div className="nav-container__wrapper-right--register">
                        <Link to="/register">
                            REGISTER
                        </Link>
                    </div>
                    <div className="nav-container__wrapper-right--login">
                        <Link to="/login">
                            SIGN IN
                        </Link> 
                    </div>
                    <Link to="/cart">
                        <div className="nav-container__wrapper-right--order">
                        <Badge badgeContent={quantity} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                        </div>
                    </Link> 
                </div>
            </div>
        </div>
    )
}

export default Navbar
