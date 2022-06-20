import ProductList from "./ProductList/ProductList";
import { withRouter } from 'react-router-dom'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
    VStack,
    HStack,
    Box,
    CloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import './Dashboard.css';

const slides = ["/img/eslide1.jpg", "/img/eslide2.jpg", "/img/eslide3.jpg"];
const delay = 5000;

const Dashboard = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => setIndex((prevIndex) => prevIndex === slides.length - 1 ? 0 : prevIndex + 1), delay
        );

        return () => {
            resetTimeout();
        }
    }, [index])

    return (
        <>
            <div className="slideshow">
                <div className="sliders" style={{ transform: `translate3d(${-index * 100}%, 0, 0)`, textAlign: "center" }}>
                    {
                        slides.map((slide, index) => (
                            <div className="slide" key={index}>
                                <img src={slide} className="slide-img" />
                            </div>
                        ))
                    }
                </div>
                <div className="slider-dots">
                    {slides.map((_, i) => (
                        <div key={i} className={`slider-dot${index == i ? " active" : ""}`} onClick={() => {
                            setIndex(i)
                        }}></div>
                    ))}
                </div>
            </div>
            <ProductList />

        </>
    )
}

export default withRouter(Dashboard);