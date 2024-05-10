// ResponsiveText.jsx
import React, { useEffect, useRef } from "react";

function ResponsiveText({ text }) {
  const textRef = useRef(null);

  useEffect(() => {
    const resizeText = () => {
      const containerWidth = textRef.current.offsetWidth;
      const fontSize = Math.min(2, containerWidth / 10) + "rem"; // Adjust the formula as needed
      textRef.current.style.fontSize = fontSize;
    };

    resizeText();
    window.addEventListener("resize", resizeText);

    return () => window.removeEventListener("resize", resizeText);
  }, []);

  return (
    <h1
      ref={textRef}
      style={{ textAlign: "center", marginTop: "60px", whiteSpace: "nowrap" }}
    >
      {text}
    </h1>
  );
}

export default ResponsiveText;
