// import React, { useEffect, useState } from "react";
// import "./Preloader.css"; // Import your CSS for styling

// const Preloader = () => {
//   const [videoEnded, setVideoEnded] = useState(false);

//   useEffect(() => {
//     window.addEventListener("load", () => {
//       document.getElementById("preloader").style.display = "none";
//     });
//   }, []);

//   const handleVideoEnd = () => {
//     setVideoEnded(true);
//   };

//   return (
//     <div>
//       {!videoEnded && (
//         <div id="preloader">
//           {/* Embed YouTube video using an iframe */}
//           <iframe
//             id="preloader-video"
//             width="560"
//             height="315"
//             src="https://www.youtube.com/embed/YTh4OuZ1nfA?autoplay=1&mute=1&controls=0&loop=1&playlist=YTh4OuZ1nfA"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             // onLoad={handleVideoEnd} // This might not work as expected for YouTube videos
//           ></iframe>
//         </div>
//       )}
//       {videoEnded && (
//         <div>
//           {/* Your data goes here */}
//           <h1>Welcome to My Website</h1>
//           {/* Add more of your content here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Preloader;

import React, { useEffect, useState } from "react";
import "./Preloader.css"; // Import your CSS for styling
import { useParams } from "react-router-dom";

const Preloader = () => {
  const { id } = useParams();
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      document.getElementById("preloader").style.display = "none";
    });
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const videoUrl = `${process.env.PUBLIC_URL}/${id}.mp4`;
  return (
    <div>
      {!videoEnded && (
        <div id="preloader">
          <video
            id="preloader-video"
            autoPlay
            muted
            onEnded={handleVideoEnd}
            playsInline
          >
            <source
              src={videoUrl}
              // src={process.env.PUBLIC_URL + "/2.mp4"}
              //   src="https://www.youtube.com/watch?v=YTh4OuZ1nfA"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {/* <button
            onClick={() => document.getElementById("preloader-video").play()}
          >
            Play Video
          </button> */}
        </div>
      )}
      {videoEnded && <div></div>}
    </div>
  );
};

export default Preloader;

// // Preloader.jsx
// import React, { useEffect, useState } from "react";
// import "./Preloader.css"; // Import your CSS for styling

// const Preloader = () => {
//   const [videoEnded, setVideoEnded] = useState(false);
//   useEffect(() => {
//     window.addEventListener("load", () => {
//       document.getElementById("preloader").style.display = "none";
//     });
//   }, []);
//   const handleVideoEnd = () => {
//     setVideoEnded(true);
//   };

//   return (
//     <div id="preloader">
//       <video id="preloader-video" autoPlay muted onEnded={handleVideoEnd}>
//         <source
//           src={process.env.PUBLIC_URL + "/IntroVideo.mp4"}
//           type="video/mp4"
//         />
//         Your browser does not support the video tag.
//       </video>
//       {videoEnded && (
//         <div>
//           {/* Your data goes here */}
//           <h1>Welcome to My Website</h1>
//           {/* Add more of your content here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Preloader;
