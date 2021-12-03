import React from 'react';
import { Send } from "@material-ui/icons";
import './NewsLatter.scss'

const NewsLatter = () => {
    return (
        <div className="newLatter">
            <h1>
                Newsletter
            </h1>
            <div className="newLatter--desc">
                Get timely updates from your favorite products.
            </div>
            <div className="newLatter__input">
                <input placeholder="Your email" />
                <button>
                    <Send />
                </button>
            </div>
        </div>
    )
}

export default NewsLatter
