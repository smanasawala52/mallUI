// import Carousel from "react-bootstrap/Carousel";
// // import ExampleCarouselImage from './ExampleCarouselImage';

// const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

// export default function CustomCarousel1(props) {
//   return (
//     <Carousel>
//       <Carousel.Item>
//         {/* <ExampleCarouselImage text="First slide" /> */}
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         {props.jsonData[0]?.images?.map(
//           (logo, index) =>
//             logo.imgType === "BG" && (
//               <img
//                 alt="Logo"
//                 style={{ height: "50px", margin: "0" }}
//                 src={API_URL + logo.imgUrl}
//                 loading="lazy"
//               />
//             )
//         )}
//         {/* <ExampleCarouselImage text="Second slide" /> */}
//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         {/* <ExampleCarouselImage text="Third slide" /> */}
// //         <Carousel.Caption>
// //           <h3>Third slide label</h3>
// //           <p>
// //             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
// //           </p>
// //         </Carousel.Caption>
// //       </Carousel.Item>
// //     </Carousel>
// //   );
// // }

// // import React from "react";
// // import Carousel from "react-bootstrap/Carousel";
// // const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

// // function CustomCarousel1(props) {
// //   return (
// //     <Carousel>
// //       {props.jsonData[0]?.images?.map((image, index) => {
// //         if (image.imgType === "BG") {
// //           return (
// //             <Carousel.Item key={index} interval={5000}>
// //               <img
// //                 className="d-block w-100"
// //                 src={API_URL + image.imgUrl}
// //                 alt={`Slide ${index + 1}`}
// //               />
// //               <Carousel.Caption>
// //                 <h3>Slide {index + 1}</h3>
// //                 <p>Description for slide {index + 1}</p>
// //               </Carousel.Caption>
// //             </Carousel.Item>
// //           );
// //         }
// //         return null; // Skip if imgType is not "BG"
// //       })}
// //     </Carousel>
// //   );
// // }

// // export default CustomCarousel1;

// import React, { useState, useEffect } from "react";
// const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

// function CustomCarousel1(props) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   // const bgImages = props.jsonData[0]?.images
//   //   ?.filter((image) => image.imgType === "BG")
//   //   .map((image) => API_URL + image.imgUrl);
//   const bgImages =
//     (props.jsonData &&
//       props.jsonData[0]?.images
//         ?.filter((image) => image.imgType === "BG")
//         .map((image) => API_URL + image.imgUrl)) ||
//     [];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((currentImageIndex + 1) % bgImages?.length);
//     }, 5000); // Change background image every 5 seconds

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, [bgImages?.length]);

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgImages[currentImageIndex]})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh", // Adjust as needed
//         width: "100%", // Adjust as needed
//         position: "relative",
//         zIndex: "-100",
//       }}
//     >
//       <h1>Hello</h1>
//       {/* Your content here */}
//     </div>
//   );
// }

// export default CustomCarousel1;

// import React, { useState, useEffect } from "react";
// import Carousel from "react-bootstrap/Carousel";
// const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

// function CustomCarousel1(props) {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   // Ensure bgImages is always an array
//   const bgImages =
//     (props.jsonData &&
//       props.jsonData[0]?.images
//         ?.filter((image) => image.imgType === "BG")
//         .map((image) => API_URL + image.imgUrl)) ||
//     [];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Safely access bgImages.length
//       if (bgImages.length > 0) {
//         setCurrentImageIndex((currentImageIndex + 1) % bgImages.length);
//       }
//     }, 1000); // Change background image every 5 seconds

//     return () => clearInterval(interval); // Clean up on component unmount
//   }, [bgImages.length]);

//   // Apply styles conditionally to ensure the div is only styled if bgImages is not empty
//   const backgroundImageStyle =
//     bgImages.length >= 0
//       ? {
//           backgroundImage: `url(${bgImages[currentImageIndex]})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "100vh", // Adjust as needed
//           width: "100%", // Adjust as needed
//           position: "relative", // Ensure zIndex is effective
//           zIndex: "-100",
//         }
//       : {};

//   return <div style={backgroundImageStyle}>{/* Your content here */}</div>;
// }

// export default CustomCarousel1;

import { Opacity } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

function CustomCarousel1(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Ensure bgImages is always an array
  const bgImages =
    (props.jsonData &&
      props.jsonData[0]?.images
        ?.filter((image) => image.imgType === "BG")
        .map((image) => API_URL + image.imgUrl)) ||
    [];

  useEffect(() => {
    console.log("Setting up interval"); // Debugging
    const interval = setInterval(() => {
      console.log("Interval triggered"); // Debugging
      // Safely access bgImages.length
      if (bgImages.length > 0) {
        setCurrentImageIndex((currentImageIndex + 1) % bgImages.length);
        console.log(`Current image index: ${currentImageIndex}`); // Debugging
      } else {
        console.log("No background images available"); // Debugging
      }
    }, 50000); // Change background image every 5 seconds

    return () => {
      console.log("Clearing interval"); // Debugging
      clearInterval(interval); // Clean up on component unmount
    };
  }, [bgImages.length, currentImageIndex]); // Added currentImageIndex as a dependency

  // Apply styles conditionally to ensure the div is only styled if bgImages is not empty
  const backgroundImageStyle =
    bgImages.length > 0
      ? {
          backgroundImage: `url(${bgImages[currentImageIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Adjust as needed
          width: "100%", // Adjust as needed
          position: "relative", // Ensure zIndex is effective
          zIndex: "-100",
          Opacity: "5",
        }
      : {};

  return <div style={backgroundImageStyle}>{/* Your content here */}</div>;
}

export default CustomCarousel1;
