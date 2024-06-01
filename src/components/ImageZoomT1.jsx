import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ImageZoomInOut.css";
import Box from "@mui/material/Box";

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { borderRadius } from "@mui/system";

function ImageZoomT1(props) {
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
    return (
      <div>
        <div
          style={{
            position: "absolute",

            top: 0,
            right: 0,
            display: "flex",
            flexDirection: "row",
            zIndex: 1000, // Ensure high z-index
            background: "transparent",
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
      <div
        style={{
          position: "relative", // Ensure this container is relatively positioned
          border: "5px solid white",

          overflow: "hidden",
        }}
      >
        <Controls />
        <TransformComponent>
          <img
            style={{
              width: "40%",
              height: "80vh",

              borderRadius: "30px",
            }}
            src={props.src}
            draggable={false}
          />
        </TransformComponent>
      </div>

      {/* Move Controls outside of TransformComponent */}
    </TransformWrapper>
  );
}

export default ImageZoomT1;
