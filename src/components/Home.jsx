import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import Shopsdata from "../components/Shopsdata.json";
import Desktopbg from "../components/Images/Desktopbg.png";
import Map1 from "../components/Images/Map1.png";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ImageZoom from "react-image-zooom";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import Puma from "../components/Images/Puma1.png";
import DemoCarousel from "./CustomCarousel";
import ResponsiveText from "./ResponsiveText";
import VASimg from "../components/Images/VASIMG.png";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import OffersCard from "./OffersCard";
import CustomModal from "./CustomModal";
import ShopsCard from "./ShopsCard";
import EventsCard from "./EventsCard";
import Preloader from "./Preloader";
import CustomLoader from "./CustomLoader";
import AttractionCard from "./AttractionCard";
import RestaurantCard from "./RestaurantCard";
import HomeButtons from "./HomeButtons";
import MapsFloorsButtons from "./MapsFloorsButtons";
import ShopsButtons from "./ShopsButtons";
import MallMap from "./MallMap";
import ImageZoomT1 from "./ImageZoomT1";
import { useParams } from "react-router-dom";

const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

const boxStyle = {
  height: "100vh",
  backgroundImage: `url(${Desktopbg})`,
  backgroundSize: "cover",
  backgroundColor: "rgba(255, 255, 255, 2.9)",
  backgroundPosition: "center",
  overflow: "hidden",
  position: "relative",
  zIndex: "999",
};

function Home() {
  const [selectedImage, setSelectedImage] = useState(Map1);
  const [selectedButton, setSelectedButton] = useState("Maps");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [jsonData, setJsonData] = useState([]);
  const [shopSelection, setShopSelection] = useState("Shops");
  const [isVasImageLoading, setIsVasImageLoading] = useState(true);
  const [focusedButton, setFocusedButton] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("Maps");
  const { id } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Ensure bgImages is always an array
  const bgImages =
    (jsonData &&
      jsonData[0]?.images
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
    }, 5000);

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
          // width: "100%", // Adjust as needed
          position: "relative", // Ensure zIndex is effective
          zIndex: "100",
          Opacity: "0.9",
          background: "rgba(0, 0, 0, 0.9)",
        }
      : {};

  function handleSelect(selectedButton) {
    console.log(selectedButton);
    setSelectedTopic(selectedButton);
    console.log(selectedButton);
  }

  const handleZoomIn = () => {
    setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.1, 1));
  };

  const handleButton1Click = (buttonName) => {
    setSelectedTopic(buttonName === "GROUND" ? "Maps" : buttonName);
  };

  const handleMapImageClick = (image, buttonName) => {
    setSelectedImage(image);
    setFocusedButton(buttonName);
  };
  const handleShopsClick = (selection) => {
    // console.log("selection", selection);
    setShopSelection(selection);
  };
  // console.log("shop selected", shopSelection);

  useEffect(() => {
    const getjsondata = async () => {
      try {
        const response = await axios.get(
          `https://vivomall-3f02390eda90.herokuapp.com/mallmodel/${id}/`
        );
        setJsonData(response.data);
        console.log("Before", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getjsondata();
  }, []);

  useEffect(() => {});

  // console.log("Vivomall after", jsonData);
  // // console.log(jsonData[0].city);
  // console.log(jsonData[0]?.images[0]);

  return (
    <div

    // style={{ backgroundImage: `url(${Desktopbg})` }}
    // style={{
    //   backgroundImage: `url(${bgImages[currentImageIndex]})`,
    //   backgroundSize: "cover",
    //   backgroundPosition: "center",
    //   height: "100vh", // Adjust as needed
    //   width: "100%", // Adjust as needed
    //   position: "relative",
    //   zIndex: "-100",
    // }}
    >
      <Preloader />
      {/* <CustomCarousel1 jsonData={jsonData} style={boxStyle} /> */}
      <Box
        // style={backgroundImageStyle}
        // style={{
        //   backgroundImage: `url(${bgImages[currentImageIndex]})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   height: "100vh", // Adjust as needed
        //   width: "100%", // Adjust as needed
        //   position: "relative",
        //   zIndex: "100",
        // }}
        style={boxStyle}
      >
        <Navbar jsonData={jsonData} />
        {/* <h1 style={{ textAlign: "center", marginTop: "70px" }}>
          Welcome To RCity Mall
        </h1> */}
        <h1 style={{ textAlign: "center", marginTop: "60px", zIndex: "999" }}>
          Welcome To {jsonData[0]?.name}, {jsonData[0]?.city},
          {jsonData[0]?.country}
        </h1>

        <div>
          <section
            id="home-btn"
            style={{
              display: "flex",
              gap: "10px",
              marginLeft: "5px",
              borderRadius: "10px",
              marginRight: "5px",
            }}
          >
            <HomeButtons
              isSelected={selectedTopic === "Maps"}
              onSelect={() => handleSelect("Maps")}
            >
              Maps
            </HomeButtons>
            <HomeButtons
              isSelected={selectedTopic === "Shops"}
              onSelect={() => handleSelect("Shops")}
            >
              Shops
            </HomeButtons>
            <HomeButtons
              isSelected={selectedTopic === "Events"}
              onSelect={() => handleSelect("Events")}
            >
              Events
            </HomeButtons>
            <HomeButtons
              isSelected={selectedTopic === "Offers"}
              onSelect={() => handleSelect("Offers")}
            >
              Offers
            </HomeButtons>
            <HomeButtons
              isSelected={selectedTopic === "VAS"}
              onSelect={() => handleSelect("VAS")}
            >
              VAS
            </HomeButtons>
          </section>
        </div>
        {selectedTopic === "Maps" && (
          <div>
            <div className="parent-container">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "60vh",
                  gap: "100px",
                  // marginLeft: "200px",
                  marginTop: "50px",
                }}
              >
                <div>
                  <div
                    id="maps-btn"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "5%",
                    }}
                  >
                    {jsonData[0]?.images?.map(
                      (floor, index) =>
                        floor.imgType === "FLOOR" && (
                          <MapsFloorsButtons
                            isSelected={focusedButton === floor.displayName}
                            onSelect={() =>
                              handleMapImageClick(
                                API_URL + floor.imgUrl,
                                floor.displayName
                              )
                            }
                          >
                            {" "}
                            {floor.displayName}
                          </MapsFloorsButtons>
                        )
                    )}
                    {/* <button
                            className="map-btn"
                            key={index}
                            onClick={() =>
                              handleButtonClick(API_URL + floor.imgUrl)
                            }
                          >
                            {floor.displayName}
                          </button> */}
                  </div>
                </div>

                <div>
                  {selectedImage && (
                    <div>
                      <MallMap imageUrl={selectedImage} />
                    </div>
                  )}
                </div>
                {/* <ImageZoom
                        sx={{
                          height: "450px",
                          width: "500px",
                          maxWidth: "1300px",
                          marginLeft: "40px",
                          borderRadius: "30px",
                          transform: `scale(${zoomLevel})`,
                          transformOrigin: "bottom right",
                        }}
                        className="map-image"
                        src={selectedImage}
                        alt="Zoom-images"
                        zoom="300"
                      /> */}
              </Box>
            </div>
            {/* <div className="mobile-container">
              <Box
                sx={{
                  // display: "flex",
                  alignItems: "center",
                  // height: "60vh",

                  // marginLeft: "200px",
                  marginTop: "20px",
                }}
              >
                <div>
                  <div
                    id="maps-btn"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5%",
                    }}
                  >
                    {jsonData[0]?.images?.map(
                      (floor, index) =>
                        floor.imgType === "FLOOR" && (
                          <MapsFloorsButtons
                            isSelected={focusedButton === floor.displayName}
                            onSelect={() =>
                              handleMapImageClick(
                                API_URL + floor.imgUrl,
                                floor.displayName
                              )
                            }
                          >
                            {" "}
                            {floor.displayName}
                          </MapsFloorsButtons>
                        )
                    )}
                  </div>
                  <div
                    style={{
                      border: "5px solid white",
                      maxHeight: "50%",
                      transform: "rotate(90deg)",
                      marginTop: "20%",

                      height: "50%",
                    }}
                  >
                    <ImageZoomT1 src={selectedImage} />
                  </div>
                </div>
              </Box>
            </div> */}
            <div className="Mobile-container-vas">
              {jsonData[0]?.images?.map(
                (vas, index) =>
                  vas.imgType === "VAS" &&
                  vas.deviceType === "MOBILE" && (
                    <>
                      <h1>
                        <div
                          id="maps-btn"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "5%",
                          }}
                        >
                          {jsonData[0]?.images?.map(
                            (floor, index) =>
                              floor.imgType === "FLOOR" && (
                                <MapsFloorsButtons
                                  isSelected={
                                    focusedButton === floor.displayName
                                  }
                                  onSelect={() =>
                                    handleMapImageClick(
                                      API_URL + floor.imgUrl,
                                      floor.displayName
                                    )
                                  }
                                >
                                  {" "}
                                  {floor.displayName}
                                </MapsFloorsButtons>
                              )
                          )}
                        </div>
                      </h1>
                      <div
                        style={{ transform: "rotate(90deg)", marginTop: "20%" }}
                      >
                        {/* <img
                        style={{
                          width: "80%",
                          height: "60vh",
                          marginTop: "20px",
                          borderRadius: "30px",
                        }}
                        src={API_URL + vas.imgUrl}
                      /> */}
                        <ImageZoomT1 src={selectedImage} />
                      </div>
                    </>
                  )
              )}
            </div>
          </div>
        )}
        {selectedTopic === "Shops" && (
          <div>
            <div
              id="shops-btn"
              style={{
                display: "flex",
                gap: "10px",
                marginLeft: "5px",
                borderRadius: "10px",
                marginRight: "5px",
                marginTop: "10px",
                justifyContent: "center",
              }}
            >
              <ShopsButtons
                autoFocus
                isSelected={shopSelection === "Shops"}
                onSelect={() => handleShopsClick("Shops")}
              >
                Shops
              </ShopsButtons>
              <ShopsButtons
                isSelected={shopSelection === "Attraction"}
                onSelect={() => handleShopsClick("Attraction")}
              >
                Attraction
              </ShopsButtons>
              <ShopsButtons
                isSelected={shopSelection === "Food"}
                onSelect={() => handleShopsClick("Food")}
              >
                Food
              </ShopsButtons>
              <ShopsButtons
                isSelected={shopSelection === "More"}
                onSelect={() => handleShopsClick("More")}
              >
                More
              </ShopsButtons>
            </div>
            {shopSelection === "Shops" && (
              <div>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    overflowY: "auto", // Enable vertical scrolling
                    maxHeight: "80vh", // Set a maximum height for the container
                  }}
                >
                  <ShopsCard jsonData={jsonData} />
                </Box>
              </div>
            )}
            {shopSelection === "Attraction" && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                  overflowY: "auto", // Enable vertical scrolling
                  maxHeight: "80vh", // Set a maximum height for the container
                  marginBottom: "50px !important",
                }}
              >
                <AttractionCard jsonData={jsonData} />
              </div>
            )}
            {shopSelection === "Food" && (
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                  overflowY: "auto", // Enable vertical scrolling
                  maxHeight: "80vh", // Set a maximum height for the container
                  marginBottom: "50px !important",
                }}
              >
                <RestaurantCard jsonData={jsonData} />
              </div>
            )}
            {shopSelection === "More" && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Box
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    overflowY: "auto", // Enable vertical scrolling
                    maxHeight: "80vh", // Set a maximum height for the container
                    marginBottom: "50px !important",
                    border: "1px solid white",
                    width: "90%",
                    height: "65vh",
                    padding: "20px",
                    borderRadius: "30px",
                  }}
                >
                  {jsonData[0]?.shops?.map((category, index) =>
                    category.categories.length === 0 ? null : (
                      <button className="category-btn" key={index}>
                        {category.categories[0]?.displayName}
                      </button>
                    )
                  )}
                </Box>
              </div>
            )}
          </div>
        )}
        {selectedTopic === "Events" && (
          <div>
            <EventsCard jsonData={jsonData} />
          </div>
        )}
        {selectedTopic === "Offers" && (
          <div>
            <OffersCard jsonData={jsonData} />
          </div>
        )}
        {selectedTopic === "VAS" && (
          <div>
            <div className="Desktop-container-vas">
              {jsonData[0]?.images?.map(
                (vas, index) =>
                  vas.imgType === "VAS" &&
                  vas.deviceType === "DESKTOP" && (
                    <h1>
                      <h1>
                        <a
                          href="tel:+9122267755800"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<CallIcon />}
                            sx={{
                              color: "white", // Set the text color to white
                              borderColor: "white", // Optionally, set the border color to white
                              "&:hover": {
                                borderColor: "white", // Optionally, set the border color on hover to white
                              },
                              fontSize: {
                                xs: "20px", // Small font size for extra small screens (mobile devices)
                                sm: "25px", // Larger font size for small screens and up
                              },
                            }}
                          >
                            {vas.displayName}
                          </Button>
                        </a>
                      </h1>
                      {!isVasImageLoading ? (
                        <CustomLoader />
                      ) : (
                        <img
                          style={{
                            width: "80%",
                            height: "60vh",
                            marginTop: "20px",
                            borderRadius: "30px",
                          }}
                          src={API_URL + vas.imgUrl}
                        />
                      )}
                    </h1>
                  )
              )}
            </div>
            <div className="Mobile-container-vas">
              {jsonData[0]?.images?.map(
                (vas, index) =>
                  vas.imgType === "VAS" &&
                  vas.deviceType === "MOBILE" && (
                    <h1>
                      <h1>
                        <a
                          // href="tel:+91 8010261936"
                          href="tel:+9122267755800"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<CallIcon />}
                            sx={{
                              color: "white", // Set the text color to white
                              borderColor: "white", // Optionally, set the border color to white
                              "&:hover": {
                                borderColor: "white", // Optionally, set the border color on hover to white
                              },
                              fontSize: {
                                xs: "20px", // Small font size for extra small screens (mobile devices)
                                sm: "25px", // Larger font size for small screens and up
                              },
                            }}
                          >
                            {vas.displayName}
                          </Button>
                        </a>
                      </h1>

                      <img
                        style={{
                          width: "90%",
                          height: "60vh",
                          marginTop: "20px",
                          borderRadius: "30px",
                        }}
                        src={API_URL + vas.imgUrl}
                      />
                    </h1>
                  )
              )}
            </div>
          </div>
        )}

        {/* <MallMap /> */}
        {/* <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "80vh", // Set a maximum height for the container
          }}
        >
          <Card
            sx={{
              maxWidth: 200,
              borderRadius: "30px",
              maxHeight: 400,
              height: "100%",
            }}
          >
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 200, borderRadius: "30px", maxHeight: 250 }}>
            <CardMedia
              className="shop-image"
              sx={{
                height: 100,

                overflowY: "auto",
              }}
              image={Puma}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Puma
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sports And Fitness
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="add to favorites"
                style={{ color: "black" }}
              >
                <CallIcon />
              </IconButton>
              <IconButton aria-label="share" style={{ color: "black" }}>
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
        </div> */}
        {/* <div>
        {Shopsdata.shopsdata.map(
          (
            shop // Access the shopsdata array
          ) => (
            <div key={shop.id}>
              <h2>{shop.name}</h2>
              <p>{shop.description}</p>
              <p>{shop.displayName}</p>
              <img src={shop.imgUrl} alt={shop.displayName} />
            </div>
          )
        )}
      </div> */}
        {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {selectedImage && (
                    <div>
                      <ImageZoomT1 src={selectedImage} />
                    </div>
                  )}
                </div> */}
      </Box>
    </div>
  );
}

export default Home;
