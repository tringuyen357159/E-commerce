import React, { useEffect, useState } from 'react';
import { Publish } from "@material-ui/icons";
import './Product.css';
import axios from 'axios';
import { useLocation } from 'react-router';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import axiosClient from '../../utils/axiosClient';
import { toast } from 'react-toastify';

const Product = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [title, setTitle] = useState('');
    const [inStock, setInStock] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState([]);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [file, setFile] = useState(null);
    const [img, setImg] = useState('');
    const dispatch = useDispatch();
    const history = useHistory()


    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };
    const handleSize = (e) => {
        setSize(e.target.value.split(","));
    };
    const handleColor = (e) => {
        setColor(e.target.value.split(","));
    };

    useEffect(() => {

        const findProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/find/${productId}`)
                if(res && res.data && res.data.success === true){
                    setTitle(res.data.product.title)
                    setInStock(res.data.product.inStock)
                    setPrice(res.data.product.price)
                    setDesc(res.data.product.desc)
                    setCat(res.data.product.categories)
                    setSize(res.data.product.size)
                    setColor(res.data.product.color)
                    setColor(res.data.product.color)
                    setImg(res.data.product.img)
                }
            } catch (error) {
                console.log(error);
            }
        }

        findProduct()
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
            case "paused":
                console.log("Upload is paused");
                break;
            case "running":
                console.log("Upload is running");
                break;
            default:
            }
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                const product = { img: downloadURL, categories: cat, size: size, color: color, title: title, desc: desc, price: price, inStock: inStock };
                console.log(product);
                try {
                    const res = await axiosClient.put(`http://localhost:5000/api/products/update/${productId}`, product);
                    if(res && res.data && res.data.success === true){
                        dispatch({
                            type: "UPDATE_PRODUCT_SUCCESS",
                            payload: res.data.updatedProduct
                        });
                        toast.success("Update product successfully")
                        history.push('/products')
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        }
        );
    };
console.log(inStock);
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Update Product</h1>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Title</label>
                        <input 
                            name="title"
                            type="text"
                            placeholder="Apple Airpods"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Description</label>
                        <input 
                           name="desc"
                           type="text"
                           placeholder="description..."
                           value={desc}
                           onChange={(e) => setDesc(e.target.value)}
                        />
                         <label>Price</label>
                        <input
                            name="price"
                            type="number"
                            placeholder="100"
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label>Size</label>
                        <input
                            name="size"
                            type="text"
                            placeholder="XL,M,S..."
                            value={size} 
                            onChange={handleSize}
                        />
                        <label>Color</label>
                        <input
                            name="color"
                            type="text"
                            placeholder="Blue,Yellow..."
                            value={color} 
                            onChange={handleColor}
                        />
                        <label>Categories</label>
                        <input 
                            type="text" 
                            placeholder="jeans,skirts"  
                            value={cat} 
                            onChange={handleCat}
                        />
                        <label>In Stock</label>
                        <select 
                            name="inStock" 
                            id="idStock" 
                            value={inStock}
                            onChange={(e) => setInStock(e.target.value)}
                        >
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={img} />
                            <label htmlFor="file">
                                <Publish/>
                            </label>
                            <input 
                                type="file" 
                                id="file" 
                                style={{display:"none"}} 
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <button 
                            className="productButton"
                            onClick={handleClick}
                        >Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Product
