import React,{ useState } from 'react';
import './Slide.scss';
import { sliderItems } from '../utils/data';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";

const Wrapper = styled.div`
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex( slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    };

    return (
        <div className="slide-container" >
            <div className="slide-container__arrow arrow-left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </div>
            <Wrapper slideIndex={slideIndex} className="slide-container__wrapper">
                {sliderItems.map(item => (
                    <div 
                        className="slide-container__wrapper-item" 
                        key={item.id}
                    >
                        <div className="slide-container__wrapper-item--img">
                            <img src={item.img} alt="slide" />
                        </div>
                        <div className="slide-container__wrapper-item--info">
                            <h1>
                                {item.title}
                            </h1>
                            <p>
                                {item.desc}
                            </p>
                            <button>
                                SHOW NOW
                            </button>
                        </div>
                    </div>
                ))}
            </Wrapper>
            <div className="slide-container__arrow arrow-right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </div>
        </div>
    )
}

export default Slide
