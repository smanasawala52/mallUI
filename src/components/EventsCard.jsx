import React from "react";
import { useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Modal from "@mui/material/Modal";

const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  // height: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  padding: "15px",
  borderRadius: "20px",
  boxShadow: "white 0px 5px 15px,white 0px -5px 15px",
};

export default function EventsCard(props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to track if the image is loading
  const [coupon, setCoupon] = useState(null);
  const handleOpen = (item) => {
    setSelectedItem(item); // Set the selected item when a card is clicked
    setOpen(true);

    const fetchCoupon = async () => {
      console.log("fetch coupon", item.imgUrl);
      try {
        const response = await axios.get(
          `${API_URL}${item.imgUrl}`,
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
    setCoupon("");
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
          justifyContent: "left",
          overflowY: "auto", // Enable vertical scrolling
          maxHeight: "80vh", // Set a maximum height for the container
          marginBottom: "50px !important",
        }}
      >
        {props.jsonData[0].events?.map((data) => {
          const endDate = new Date(data.endDate);
          const currentDate = new Date();
          if (endDate < currentDate) {
            return null;
          } else {
            return (
              <Card
                sx={{
                  //   maxWidth: "48%",
                  width: "23vh",

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
                  image={API_URL + data?.imgUrl}
                  title="green iguana"
                />
                <CardContent
                  sx={{ height: "15vh" }}
                  onClick={() => handleOpen(data)}
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <>
                    {/* <img
                      className="shop-image"
                      style={{
                        marginTop: "10px",
                        width: "50%",
                        height: "50%",
                        objectFit: "cover",
                        alignItems: "center",
                      }}
                      src={API_URL + selectedItem.imgUrl}
                    /> */}
                    {isLoading ? (
                      <CircularProgress
                        sx={{
                          marginTop: "30px",
                          marginBottom: "30px",
                          marginLeft: "80px",
                          marginRight: "80px",
                        }}
                      />
                    ) : (
                      <img
                        className="shop-image"
                        style={{
                          marginTop: "10px",
                          width: "60%",
                          height: "50%",
                          objectFit: "cover",
                          alignItems: "center",
                        }}
                        src={coupon}
                      />
                    )}
                  </>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{
                        marginLeft: "10px",
                        fontSize: "140%",
                        color: "#c5000f",
                        fontWeight: "bold",
                        marginTop: "5px",
                      }}
                    >
                      {" "}
                      {selectedItem.displayName?.length > 30
                        ? selectedItem.displayName?.substring(0, 25) + "..."
                        : selectedItem.displayName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "15px",
                        marginLeft: "10px",
                        fontSize: "75%",
                      }}
                    >
                      Start:
                      {selectedItem.startDate
                        ? new Date(selectedItem.startDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short", // This will display the full month name
                              day: "2-digit",
                            }
                          )
                        : "N/A"}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                        marginTop: "5px",
                        fontSize: "75%",
                      }}
                    >
                      End:{" "}
                      {selectedItem.endDate
                        ? new Date(selectedItem.endDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short", // This will display the full month name
                              day: "2-digit",
                            }
                          )
                        : "N/A"}
                    </Box>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {selectedItem.description.length > 50
                        ? selectedItem.description.substring(0, 50) + "..."
                        : selectedItem.description}
                    </Typography> */}
                  </div>
                </div>
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
                    {selectedItem.additionalDetails}
                  </h4>

                  <div
                    style={{
                      borderTop: "1px solid black",
                      width: "100%",
                      marginLeft: "10px",
                    }}
                  ></div>
                </div>
              </div>
              {/* <div>
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
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
