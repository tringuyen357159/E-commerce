import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryItem.scss'

const CategoryItem = (props) => {
    const { item } = props;

    return (
        <div className="categoryItem">
            <Link to={`/products/${item.cat}`}>
                <img src={item.img} alt="img-categoryItem" />
                <div className="categoryItem__info">
                    <h1>
                        {item.title}
                    </h1>
                    <button>
                        SHOP NOW
                    </button>
                </div>
            </Link>
        </div>
    )
}

export default CategoryItem
