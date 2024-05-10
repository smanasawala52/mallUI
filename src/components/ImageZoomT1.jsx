import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ImageZoomInOut.css";

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

function ImageZoomT1(props) {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div>
        <div
          className="btn-container"
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000, // Ensure high z-index
          }}
        >
          <button className="zoom-btn" onClick={() => zoomIn()}>
            <AddIcon />
          </button>
          <button className="zoom-btn" onClick={() => zoomOut()}>
            <RemoveIcon />
          </button>
          {/* <button onClick={() => resetTransform()}>Reset</button> */}
        </div>
      </div>
    );
  };

  return (
    <TransformWrapper>
      <Controls /> {/* Move Controls outside of TransformComponent */}
      <TransformComponent>
        <div
          style={{
            position: "relative",
            border: "5px solid white",
            borderRadius: "30px",
          }}
        >
          <img
            className="mob-map-image"
            src={props.src}
            alt="test"
            width="100%"
            draggable={false}
          />
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default ImageZoomT1;

//  <div
// style={{
//   backgroundColor: "#ffffff",
//   borderRadius: "10px",
//   position: "relative",
//   overflow: "hidden",
//  }}  >
// <div className="btn-container">
//   <button className="zoom" onClick={handleZoomIn}>
//     <span>
//       <AddIcon />
//     </span>
//   </button>
//   <button className="zoom" onClick={handleZoomOut}>
//     <span>
//       <RemoveIcon />
//     </span>
//   </button>
// </div>
// <img
//   className="mob-map-image"
//   ref={imageRef}
//   src={imageUrl}
//   alt=""
//   style={{
//     width: "50vw",
//     height: "auto",
//     cursor: "move",
//     background: "rgba(0, 0, 0, 0.9)",
//     transform: `scale(${scale}) translate(${position.x}px,${position.y}px)`,
//     transition: "transform 0.3s ease",
//   }}
//   draggable={false}
// />
// </div>
