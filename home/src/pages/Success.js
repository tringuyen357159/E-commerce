import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import axiosClient from "../utils/axiosClients";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';


const Success = () => {
    const location = useLocation();
    //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
    const data = location.state.stripeData;
    const cart = location.state.products;
    const id = useSelector((state) => state.user.id);
    const [orderId, setOrderId] = useState(null);
    const history = useHistory()
   


    useEffect(() => {
        const createOrder = async () => {
            try {
                const res = await axiosClient.post("http://localhost:5000/api/order/create", {
                    userId: id,
                    products: cart.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: cart.total,
                    address: data.stripeRes.billing_details.address,
                });
                setOrderId(res.data._id);
                toast.success("Order successfuly")
            } catch(err) {
                console.log(err);
            }
    };
    
        data && createOrder();
    }, [cart, data, id]);

    const handleClick = () => {
        history.push("/")
    }

    return (
        <div
        style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <button 
                style={{ padding: 10, marginTop: 20 }}
                onClick={handleClick}
            >Go to Homepage</button>
        </div>
    );
};

export default Success;