import React, { useEffect, useState } from 'react';
import { Visibility } from "@material-ui/icons";
import "./WidgetSm.css";
import axiosClient from '../../utils/axiosClient'

const WidgetSm = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axiosClient.get("http://localhost:5000/api/user/getAll?new=true");
                if(res && res.data && res.data.success ===true){
                    setUsers(res.data.users);
                }
            } catch(err) {
                console.log(err);
            }
        };
        getUsers();
    }, []);

    return (
        <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
            {users && users.length > 0 && users.map((item) => (
                <li className="widgetSmListItem" key={item._id}>
                    <img
                        src={
                            item.img ||
                            "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                        }
                        alt=""
                        className="widgetSmImg"
                    />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{item.username}</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon" />
                        Display
                    </button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default WidgetSm
