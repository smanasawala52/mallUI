import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IconButton from "@mui/material/IconButton";
import Puma from "../components/Images/Puma1.png";
import Modal from "@mui/material/Modal";
import { border, borderRadius, height, padding } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400, //400
  // height: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  padding: "15px",
  borderRadius: "20px",
  boxShadow: "white 0px 5px 15px,white 0px -5px 15px",
};

function CouponModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <img
        onClick={handleOpen}
        src={props.src}
        // onLoad={() => setIsLoading(false)}
        onError={() => console.error("Failed to load image")}
        alt="Coupon"
        style={{
          height: "120px",
          borderRadius: "10px",
          boxShadow: "#171717 0px 5px 15px,white 0px -5px 15px",
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">{props.displayName}</h2>
          <p id="child-modal-description">{props.description}</p>
          <Button onClick={handleClose}>Close </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function ChatCard(props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track if the image is loading
  const [coupon, setCoupon] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item); // Set the selected item when a card is clicked
    setOpen(true);

    const fetchCoupon = async () => {
      console.log("fetch coupon", item.coupons[0]?.imgUrl);
      try {
        const response = await axios.get(
          `${API_URL}${item.coupons[0]?.imgUrl}`,
          { responseType: "blob" } // Ensure the response is treated as a Blob
        );
        console.log("Coupon fetch", response.data);
        const imageBlob = new Blob([response.data], { type: "image/jpeg" }); // Adjust the type as necessary
        const imageUrl = URL.createObjectURL(imageBlob); // Create an object URL for the Blob
        setCoupon(imageUrl); // Set the object URL as the coupon image URL
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupon(); // Call the fetchCoupon function
  };
  const handleClose = () => {
    setOpen(false);
    setIsLoading(true);
  };
  console.log(props.jsonData, "on chat page");
  console.log(props.search, "On chat page");
  console.log(props.filteredData?.response_json?.shopId[0]);
  return (
    <Box
      sx={{
        marginTop: "5px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        overflowY: "auto", // Enable vertical scrolling
        maxHeight: "80vh", // Set a maximum height for the container

        // border: "1px solid white",
        width: "100%",
        marginBottom: "30px",

        padding: "20px",
        borderRadius: "30px",
      }}
    >
      <div style={{ marginBottom: "50px" }}>
        <Box
          sx={{
            marginTop: "10px",

            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "left",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "100vh", // Set a maximum height for the container
          }}
        >
          {props.jsonData[0]?.shops?.map((data) => {
            if (data.id != props.filteredData?.response_json?.shopId[0]) {
              return null;
            } else {
              return (
                <Card
                  sx={{
                    //   maxWidth: "48%",
                    //   width: "180px",
                    //   maxWidth: "180px",
                    //   minWidth: "150px",
                    width: "21vh", //400 45%
                    borderRadius: "30px",
                    maxHeight: "80vh",
                    border: "3px outset black",
                  }}
                >
                  <CardMedia
                    onClick={() => handleOpen(data)}
                    className="shop-image"
                    sx={{
                      height: 150,
                      borderRadius: "30px 30px 0px 0px",
                      padding: "20px",
                    }}
                    image={API_URL + data.imgUrl}
                    title={data.displayName}
                  />
                  <CardContent
                    onClick={() => handleOpen(data)}
                    sx={{ height: "15vh", marginBottom: "20px" }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ fontSize: "22px" }}
                    >
                      {/* {data.displayName} */}
                      {data.displayName?.length > 30
                        ? data.displayName.substring(0, 25) + "..."
                        : data.displayName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.description.length > 50
                        ? data.description.substring(0, 50) + "..."
                        : data.description}{" "}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {data.phone ? (
                      <IconButton
                        aria-label="add to favorites"
                        style={{ color: "black" }}
                      >
                        <a
                          href={"tel:" + data.phone}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <CallIcon />
                        </a>
                      </IconButton>
                    ) : null}
                    {/* <IconButton aria-label="share" style={{ color: "black" }}>
                    {" "}
                    <LocationOnIcon />
                  </IconButton> */}
                  </CardActions>
                </Card>
              );
            }
          })}

        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="custom-modal"
          sx={{
            margin: {
              xs: "100px", // Apply 10px margin for extra small screens (mobile devices)
              sm: "10px", // You can adjust these breakpoints as needed
              md: "0", // Reset margin for larger screens if needed
              lg: "0",
              xl: "0",
            },
            paddin: "10px",
            // Other styles can go here
          }}
        >
          <Box sx={style}>
            <IconButton
              edge="end"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                right: 13,
                top: 1,
                color: "black",
                border: "2px solid red", // Add a red border
                borderRadius: "50%", // Make the border circular
                padding: "4px", // Adjust padding as needed to ensure the icon is centered
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedItem && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "5px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <>
                      {/* image={API_URL + selectedItem.imgUrl} */}
                      <img
                        className="shop-image"
                        style={{
                          width: "50%",
                          height: "50%",
                          objectFit: "cover",
                          alignItems: "center",
                        }}
                        src={API_URL + selectedItem.imgUrl}
                      />
                    </>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          marginLeft: "10px",
                          fontSize: "125%",

                          color: "#c5000f",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {selectedItem.displayName?.length > 30
                          ? selectedItem.displayName?.substring(0, 25) + "..."
                          : selectedItem.displayName}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                          marginLeft: "10px",
                          fontSize: "15px",
                          color: "black",
                        }}
                      >
                        {selectedItem.categories[0]?.displayName &&
                        selectedItem.categories[0]?.subCategories[0]
                          ?.displayName ? (
                          <>
                            {selectedItem.categories[0]?.displayName} |{" "}
                            {
                              selectedItem.categories[0]?.subCategories[0]
                                ?.displayName
                            }
                          </>
                        ) : (
                          <>
                            {selectedItem.categories[0]?.displayName}{" "}
                            {
                              selectedItem.categories[0]?.subCategories[0]
                                ?.displayName
                            }
                          </>
                        )}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px",
                          fontSize: "90%",
                          marginTop: "10%",
                        }}
                      >
                        <CallIcon
                          style={{
                            fontSize: "25px",
                            border: "1px solid black",
                            borderRadius: "50%",
                            padding: "3px",
                            fontSize: "180%",
                          }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {selectedItem.phone}
                        </span>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "10px",
                          marginTop: "5px",
                          fontSize: "90%",
                        }}
                      >
                        <LocationOnIcon
                          style={{
                            fontSize: "180%",
                            border: "1px solid black",
                            borderRadius: "50%",
                            padding: "3px",
                          }}
                        />
                        <span style={{ marginLeft: "8px" }}>
                          {selectedItem.shopNumber},{selectedItem.floor}
                        </span>
                      </Box>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          marginTop: "10px",
                        }}
                      ></div>

                      {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {selectedItem.description.length > 50
                    ? selectedItem.description.substring(0, 50) + "..."
                    : selectedItem.description}
                </Typography> */}
                    </div>
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid black",
                      width: "100%",

                      marginTop: "10px",
                    }}
                  ></div>
                  <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                    About
                  </h3>
                  <h4
                    style={{
                      fontSize: "60%",
                    }}
                  >
                    {selectedItem.additionalDetails}
                  </h4>

                  <div
                    style={{
                      borderTop: "1px solid black",
                      width: "100%",
                    }}
                  ></div>
                </div>
                <div>
                  {selectedItem.coupons.length === 0 ? null : (
                    <>
                      <h3
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          marginTop: "30px",
                          fontSize: "20px",
                        }}
                      >
                        Coupons/Offers Available
                      </h3>

                      {isLoading ? (
                        <CircularProgress
                          sx={{
                            marginLeft: "7%",
                            margin: "40px",
                          }}
                        />
                      ) : (
                        <>
                          <CouponModal
                            src={coupon}
                            displayName={selectedItem.coupons[0]?.displayName}
                            description={selectedItem.coupons[0]?.description}
                          />
                          {/* <img
                          onClick={() => handleOpen()}
                          src={coupon}
                          // onLoad={() => setIsLoading(false)}
                          onError={() => console.error("Failed to load image")}
                          alt="Coupon"
                          style={{
                            height: "120px",
                            borderRadius: "10px",
                            boxShadow:
                              "#171717 0px 5px 15px,white 0px -5px 15px",
                          }}
                        /> */}
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </Box>
        </Modal>
      </div>
    </Box>
  );
}
