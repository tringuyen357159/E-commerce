import React, { useState, useEffect } from 'react';
import './ListProduct.scss';
import Product from './Product';
import { popularProducts } from "../utils/data";
import axios from 'axios';

const ListProduct = (props) => {
    const { cat, filters, sort } = props;
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(
                cat
                    ? `http://localhost:5000/api/products/findAll?category=${cat}`
                    : "http://localhost:5000/api/products/findAll"
                );
        
                if(res && res.data && res.data.success === true) {
                    setProducts(res.data.products);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getProducts();
    }, [cat]);
   

    useEffect(() => {
        cat &&
          setFilteredProducts(
            products.filter((item) =>                                 //["color", "red"]
                Object.entries(filters).every(([key, value]) => //trả về mảng filters => kiểm tra value của filter có bằng res trả về?
                    item[key].includes(value)                   //có => true , k => false
                )   
            )
          );
    }, [products, cat, filters]);

    useEffect(() => {                                                       //thuật toán sắp xếp => return > 0 sort b before a
        if (sort === "newest") {                                            //                      return < 0 sort a before b                        
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

   
    return (
        <div className="listProduct">
            {cat
                ? filteredProducts.length > 0 && filteredProducts.map((item) => <Product item={item} key={item._id} />)
                : products.length > 0 && products.slice(0, 8).map((item) => <Product item={item} key={item._id} />)}
        </div>
    )
}

export default ListProduct
