import React from 'react';
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import './Sidebar.scss'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <div className="sidebar__wrapper-item">
                    <h3 className="sidebar__wrapper-item--title">Dashboard</h3>
                    <ul className="sidebar__wrapper-item-list">
                        <Link to="/" className="link">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                        </Link>
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                            <PermIdentity className="sidebarIcon" />
                            Users
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li className="sidebarListItem">
                            <Storefront className="sidebarIcon" />
                            Products
                            </li>
                        </Link>
                    </ul>
                </div>
                {/* <div className="sidebar__wrapper-item">
                    <h3 className="sidebar__wrapper-item--title">Quick Menu</h3>
                    <ul className="sidebar__wrapper-item-list">
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon" />
                            Sales
                        </li>
                        <li className="sidebarListItem">
                            <AttachMoney className="sidebarIcon" />
                            Transactions
                        </li>
                        <li className="sidebarListItem">
                            <BarChart className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
                <div className="sidebar__wrapper-item">
                    <h3 className="sidebar__wrapper-item--title">Notifications</h3>
                    <ul className="sidebar__wrapper-item-list">
                        <li className="sidebarListItem">
                            <MailOutline className="sidebarIcon" />
                            Mail
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className="sidebarIcon" />
                            Feedback
                        </li>
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className="sidebarIcon" />
                            Messages
                        </li>
                    </ul>
                </div>
                <div className="sidebar__wrapper-item">
                    <h3 className="sidebar__wrapper-item--title">Staff</h3>
                    <ul className="sidebar__wrapper-item-list">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div> */}
            </div>
      </div>
    )
}

export default Sidebar
