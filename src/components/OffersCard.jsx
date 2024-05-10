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
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // height: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  padding: "15px",
  borderRadius: "20px",
  boxShadow: "white 0px 5px 15px,white 0px -5px 15px",
};
export default function OffersCard(props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCouponLoading, setIsCouponLoading] = useState(true); // State to track if the image is loading
  const [isStoreLoading, setIsStoreLoading] = useState(true);
  const [coupon, setCoupon] = useState(null);
  const [storeImg, setStoreImg] = useState(null);

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
        setIsCouponLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoupon();
    const fetchstore = async () => {
      console.log("fetch store", item.coupons[0]?.imgUrl);
      try {
        const response = await axios.get(
          `${API_URL}${item.imgUrl}`,
          { responseType: "blob" } // Ensure the response is treated as a Blob
        );
        console.log("Store image fetch", response.data);
        const imageBlob = new Blob([response.data], { type: "image/jpeg" }); // Adjust the type as necessary
        const imageUrl = URL.createObjectURL(imageBlob); // Create an object URL for the Blob
        setStoreImg(imageUrl); // Set the object URL as the coupon image URL
        setIsStoreLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchstore();
  };
  const handleClose = () => {
    setOpen(false);
    setStoreImg("");
    setCoupon("");
    setIsCouponLoading(true);
    setIsStoreLoading(true);
  };
  console.log(props.jsonData);
  return (
    <div>
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
        }}
      >
        {props.jsonData[0].shops?.map((data) => {
          if (data.coupons.length === 0) {
            return null;
          } else {
            return (
              <Card
                sx={{
                  //   maxWidth: "48%",
                  width: "45%",

                  borderRadius: "30px",
                  maxHeight: "80vh",
                }}
              >
                <CardMedia
                  onClick={() => handleOpen(data)}
                  className="shop-image"
                  sx={{
                    height: 150,
                  }}
                  image={API_URL + data.coupons[0]?.imgUrl}
                  title={data.coupons[0]?.displayName}
                />
                <CardContent
                  onClick={() => handleOpen(data)}
                  sx={{ height: "15vh" }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {data.coupons[0]?.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.coupons[0]?.description}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <IconButton
                    aria-label="add to favorites"
                    style={{ color: "black" }}
                  >
                    <CallIcon />
                  </IconButton>
                  <IconButton aria-label="share" style={{ color: "black" }}>
                    <LocationOnIcon />
                  </IconButton>
                </CardActions> */}
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
        // BackdropComponent={({ open, ...other }) => (
        //   <div
        //     style={{
        //       position: "fixed",
        //       top: 0,
        //       left: 0,
        //       right: 0,
        //       bottom: 0,
        //       backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent black background
        //       zIndex: 999, // Ensure the backdrop is below the modal but above other content
        //     }}
        //     {...other}
        //   />
        // )}
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
          {selectedItem && (
            <>
              {/* <div style={{ marginBottom: "20px" }}>
                {selectedItem.coupons.length === 0 ? null : (
                  <>
                    <h3
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",

                        fontSize: "20px",
                      }}
                    >
                      Coupons/Offers Available
                    </h3>

                    {isLoading ? (
                      <CircularProgress
                        sx={{
                          marginLeft: "7%",
                        }}
                      />
                    ) : (
                      <img
                        src={coupon}
                        // onLoad={() => setIsLoading(false)}
                        onError={() => console.error("Failed to load image")}
                        alt="Coupon"
                        style={{
                          height: "120px",
                          borderRadius: "10px",
                          boxShadow: "#171717 0px 5px 15px,white 0px -5px 15px",
                        }}
                      />
                    )}
                  </>
                )}
              </div> */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <>
                  {isCouponLoading ? (
                    <CircularProgress
                      sx={{
                        margin: "50px",
                      }}
                    />
                  ) : (
                    <img
                      src={coupon}
                      // onLoad={() => setIsLoading(false)}
                      onError={() => console.error("Failed to load image")}
                      alt={selectedItem.coupons[0]?.displayName}
                      style={{
                        height: "120px",
                        borderRadius: "10px",
                        boxShadow: "#171717 0px 5px 15px,white 0px -5px 15px",
                      }}
                    />
                  )}
                </>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "50px",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      marginLeft: "10px",
                      fontSize:
                        selectedItem.displayName?.length > 11 ? "21px" : "25px",
                      color: "#c5000f",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {selectedItem.coupons[0]?.displayName}
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
                    {selectedItem.coupons[0]?.description}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {selectedItem.coupons[0]?.additionalDetails}
                    </h4>

                    <div
                      style={{
                        borderTop: "1px solid black",
                        width: "100%",
                        marginLeft: "10px",
                      }}
                    ></div>
                  </div>

                  {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {selectedItem.description.length > 50
                    ? selectedItem.description.substring(0, 50) + "..."
                    : selectedItem.description}
                </Typography> */}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <>
                  {/* image={API_URL + selectedItem.imgUrl} */}
                  {/* <img
                    className="shop-image"
                    style={{
                      width: "50%",
                      height: "50%",
                      objectFit: "cover",
                      alignItems: "center",
                    }}
                    src={API_URL + selectedItem.imgUrl}
                  /> */}
                  {isStoreLoading ? (
                    <CircularProgress
                      color="inherit"
                      size={50}
                      sx={{
                        margin: "50px",
                      }}
                    />
                  ) : (
                    <img
                      src={storeImg}
                      // onLoad={() => setIsLoading(false)}
                      onError={() => console.error("Failed to load image")}
                      alt={selectedItem.displayName}
                      style={{
                        width: "50%",
                        height: "50%",
                        objectFit: "cover",
                        alignItems: "center",
                      }}
                    />
                  )}
                  {/* {isLoading ? (
                    <CircularProgress
                      sx={{
                        marginLeft: "7%",
                      }}
                    />
                  ) : (
                    <img
                      src={coupon}
                      // onLoad={() => setIsLoading(false)}
                      onError={() => console.error("Failed to load image")}
                      alt="Coupon"
                      style={{
                        width: "50%",
                        height: "50%",
                        objectFit: "cover",
                        alignItems: "center",
                      }}
                    />
                  )} */}
                </>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      marginLeft: "10px",
                      fontSize:
                        selectedItem.displayName?.length > 11 ? "21px" : "25px",
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
                  {/* 
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
                    {selectedItem.categories[0]?.displayName ? (
                      <>
                        {selectedItem.categories[0]?.displayName}{" "}
                        {
                          selectedItem.categories[0]?.subCategories[0]
                            ?.displayName
                        }
                      </>
                    ) : null}
                  </Typography> */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                  >
                    <CallIcon
                      style={{
                        fontSize: "25px",
                        border: "1px solid black",
                        borderRadius: "50%",
                        padding: "3px",
                      }}
                    />
                    <span style={{ marginLeft: "8px" }}>9858697857</span>
                  </Box>

                  {/* <IconButton
                  aria-label="share"
                  style={{ color: "black", fontSize: "20px" }}
                > */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "10px",
                      marginTop: "5px",
                    }}
                  >
                    <LocationOnIcon
                      style={{
                        fontSize: "25px",
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
                  >
                    <div
                      style={{
                        borderTop: "1px solid black",
                        width: "100%",
                        marginLeft: "10px",
                      }}
                    ></div>
                    <h3 style={{ textAlign: "center", fontSize: "20px" }}>
                      About
                    </h3>
                    <h4
                      style={{
                        fontSize: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {selectedItem.description}
                    </h4>

                    <div
                      style={{
                        borderTop: "1px solid black",
                        width: "100%",
                        marginLeft: "10px",
                      }}
                    ></div>
                  </div>

                  {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {selectedItem.description.length > 50
                    ? selectedItem.description.substring(0, 50) + "..."
                    : selectedItem.description}
                </Typography> */}
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
