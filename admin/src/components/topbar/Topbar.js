import React from 'react';
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import './Topbar.scss';
import { useSelector } from 'react-redux';

const Topbar = () => {
    const admin = useSelector((state) => state.admin);
    return (
        <div className="topbar">
            <div className="topbar__wrapper">
                <div className="topbar__wrapper-left">
                    <span className="logo">Shop</span>
                </div>
                <div className="topbar__wrapper-right">
                    <div className="topbar__wrapper-right--icon">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbar__wrapper-right--icon">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbar__wrapper-right--icon">
                        <Settings />
                    </div>
                    <div className="topbar__wrapper-right--icon">
                        {admin.username}
                    </div>
                    <img 
                        src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" 
                        alt="" 
                        className="topbar__wrapper-right--img" 
                    />
                </div>
            </div>      
        </div>
    )
}

export default Topbar
