import React, { useEffect, useRef, useState } from "react";
import "./ImageZoomInOut.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ImageZoomInOut = ({ imageUrl }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleZoomIn = () => {
    setScale((scale) => scale + 0.1);
  };
  const handleZoomOut = () => {
    setScale((scale) => {
      // Prevent scale from going below 1
      if (scale > 1) {
        return scale - 0.1;
      }
      return scale;
    });
  };

  useEffect(() => {
    const image = imageRef.current;
    let isDragging = false;
    let prevPosition = { x: 0, y: 0 };
    let initialDistance = null;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && initialDistance) {
        const currentDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        const zoomFactor = currentDistance / initialDistance;
        setScale((scale) => scale * zoomFactor);
        initialDistance = currentDistance;
      }
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      prevPosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging || scale === 1) return;
      const deltaX = e.clientX - prevPosition.x;
      const deltaY = e.clientY - prevPosition.y;
      prevPosition = { x: e.clientX, y: e.clientY };
      setPosition((position) => ({
        x: position.x + deltaX,
        y: position.y + deltaY,
      }));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    image?.addEventListener("mousedown", handleMouseDown);
    image?.addEventListener("mousemove", handleMouseMove);
    image?.addEventListener("mouseup", handleMouseUp);
    image?.addEventListener("touchstart", handleTouchStart);
    image?.addEventListener("touchmove", handleTouchMove);

    return () => {
      image?.removeEventListener("mousedown", handleMouseDown);
      image?.removeEventListener("mousemove", handleMouseMove);
      image?.removeEventListener("mouseup", handleMouseUp);
      image?.removeEventListener("touchstart", handleTouchStart);
      image?.removeEventListener("touchmove", handleTouchMove);
    };
  }, [imageRef, scale]);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="btn-container">
        <button className="zoom" onClick={handleZoomIn}>
          <span>
            <AddIcon />
          </span>
        </button>
        <button className="zoom" onClick={handleZoomOut}>
          <span>
            <RemoveIcon />
          </span>
        </button>
      </div>
      <img
        className="mob-map-image"
        ref={imageRef}
        src={imageUrl}
        alt=""
        style={{
          width: "50vw",
          height: "auto",
          cursor: "move",
          background: "rgba(0, 0, 0, 0.9)",
          transform: `scale(${scale}) translate(${position.x}px,${position.y}px)`,
          transition: "transform 0.3s ease",
        }}
        draggable={false}
      />
    </div>
  );
};

export default ImageZoomInOut;

// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// // import "react-easy-crop/dist/index.css";

// const ImageZoomInOut = ({ imageUrl }) => {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [cropSize, setCropSize] = useState({ width: 0, height: 0 });

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     console.log(croppedArea, croppedAreaPixels);
//   }, []);

//   const onZoomChange = useCallback((zoom) => {
//     setZoom(zoom);
//   }, []);

//   const onCropChange = useCallback((crop) => {
//     setCrop(crop);
//   }, []);

//   const onMediaLoaded = useCallback((mediaSize) => {
//     const { width, height } = mediaSize;
//     setCropSize({ width, height });
//   }, []);

//   return (
//     <div>
//       <Cropper
//         className="mob-map-image"
//         image={imageUrl}
//         crop={crop}
//         zoom={zoom}
//         aspect={1}
//         cropShape="rect"
//         showGrid={false}
//         onCropChange={onCropChange}
//         onCropComplete={onCropComplete}
//         onZoomChange={onZoomChange}
//         cropSize={cropSize}
//         onMediaLoaded={onMediaLoaded}
//         classes={{ containerClassName: "my-custom-class" }}
//       />
//     </div>
//   );
// };

// export default ImageZoomInOut;
