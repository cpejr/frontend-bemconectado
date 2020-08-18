import React, { useState } from "react";
import { ArrowDropUp } from '@material-ui/icons/';
import "./styles.css";



export default function BacktoTop({position}) {
    const [showScroll, setShowScroll] = useState(false)
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false)
        }
    };
    window.addEventListener('scroll', checkScrollTop)
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div onClick={scrollTop} className="button-box" style={{right:position.right , display: showScroll ? 'flex' : 'none'}}>           
            <ArrowDropUp
                className="scrollTop"  style={{ height: 40, display: showScroll ? 'flex' : 'none' }}
            />
        </div>
    );
}