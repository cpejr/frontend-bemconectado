import React, { useState } from "react";
import { ArrowDropUp } from "@material-ui/icons/";
import "./styles.css";

export default function BacktoTopButton({ position }) {
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const myStyle = position
    ? { right: position.right, display: showScroll ? "flex" : "none" }
    : { display: showScroll ? "flex" : "none" };

  return (
    <div onClick={scrollTop} className="button-box" style={myStyle}>
      <ArrowDropUp
        className="upIcon"
        style={{ display: showScroll ? "flex" : "none" }}
      />
    </div>
  );
}
