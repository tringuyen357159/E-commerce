import React from 'react';
import './Category.scss';
import { categories } from "../utils/data";
import CategoryItem from './CategoryItem';

const Category = () => {
    return (
        <div className="catogory-container">
            {categories.map((item) => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </div>
    )
}

export default Category
