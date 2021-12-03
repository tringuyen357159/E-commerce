import React,{ useState } from 'react';
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import ListProduct from '../components/ListProduct'
import Newsletter from '../components/NewsLatter'
import Footer from '../components/Footer'
import './ProductList.scss';
import { useLocation } from "react-router";

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
          ...filters,
          [e.target.name]: value,
        });
    };

    return (
        <div className="productList">
            <Navbar />
            <Announcement />
            <h1 className="productList-title">Dresses</h1>
            <div className="productList-container">
                <div className="productList-container__filter">
                    <span>Filter Products:</span>
                    <select name="color" onChange={handleFilters} value={filters.color}>
                        <option value="" disabled selected>
                            Color
                        </option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Red">Red</option>
                        <option value="Blue">Blue</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                    </select>
                    <select name="size" onChange={handleFilters} value={filters.size}>
                        <option value="" disabled selected>
                            Size
                        </option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </div>
                <div className="productList-container__filter">
                    <span>Sort Products:</span>
                    <select onChange={(e) => setSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="asc">Price (asc)</option>
                        <option value="desc">Price (desc)</option>
                    </select>
                </div>
            </div>
            <ListProduct cat={cat} filters={filters} sort={sort}/>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default ProductList
