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
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { borderRadius, fontSize, fontWeight } from "@mui/system";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ChatCard from "./ChatCard";

const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";
const URL =
  "https://vivomall-3f02390eda90.herokuapp.com/mallmodel/captureQuery?mallId=2&lang=English";

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

const CustomTextField = styled(TextField)({
  "& .MuiInput-input": {
    color: "black",
  },

  // "&.MuiInput-colorSecondary": {
  //   color: "white",
  // },
  "&  .MuiInputBase-input": {
    color: "black",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white", // Set border bottom color to white
  },
  "& label": {
    color: "black", // Set default text color to white
    fontSize: "15px",
    fontWeight: "bold",
  },

  "& label.Mui-focused": {
    color: "black",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderRadius: "30px",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      boxShadow: "0 0 30px white",
      borderColor: "white",
      borderRadius: "30px",
    },
    "&:hover fieldset": {
      borderColor: "white",
      boxShadow: "0 0 30px white",
    },
    // "& fieldset": {
    //   borderColor: "white",
    //   boxShadow: "0 0 30px brown",
    // },
    "&.MuiAutocomplete-inputFocused": {
      borderColor: "white",
      backgroundColor: "black", //for background set
      boxShadow: "0 0 60px white",
      color: "grey",
    },
  },
});

const languages = [
  {
    value: "English",
    label: "EN",
  },
  {
    value: "Hindi",
    label: "HI",
  },
  {
    value: "Arabic",
    label: "AR",
  },
];
function Home() {
  const [jsonData, setJsonData] = useState([]);
  const [search, setSearch] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  let formData = new FormData(); //formdata object
  formData.append("query", search); //append the values with key, value pair

  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  console.log("Request URL:", URL);
  console.log("Request Method:", "POST");
  console.log("Request Headers:", config.headers);
  console.log("Request Body:", formData);

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
  };
  console.log("search", search);

  const getShop = async () => {
    console.log("search inside", search);
    try {
      const response = await axios.post(URL, formData, config);
      if (response && response.data) {
        let parsedData = JSON.parse(response.data.content);
        setFilteredData(parsedData);
        console.log("Shop IDs:", filteredData);
      } else {
        console.error("Response data is not valid JSON.");
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  // let responseData = JSON.parse(filteredData?.content);

  // console.log(responseData?.response_json?.shopId);

  // console.log(filteredData, "Filtered data ");
  // console.log(filteredData.content, "Filtered data ");
  // console.log(filteredData.content.response_json, "Filtered data ");

  // let responseData = JSON.parse(filteredData?.content);
  // console.log(responseData.response_json.shopId[0]);

  useEffect(() => {
    const getjsondata = async () => {
      try {
        const response = await axios.get(
          `https://vivomall-3f02390eda90.herokuapp.com/mallmodel/1/`
        );
        setJsonData(response.data);
        console.log("Before", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getjsondata();
  }, []);

  return (
    <div>
      {/* <Preloader /> */}

      <Box style={boxStyle}>
        <Navbar jsonData={jsonData} />
        {/* <h1 style={{ textAlign: "center", marginTop: "70px" }}>
          Welcome To RCity Mall
        </h1> */}
        <h1 style={{ textAlign: "center", marginTop: "60px", zIndex: "999" }}>
          Welcome To {jsonData[0]?.name}, {jsonData[0]?.city},
          {jsonData[0]?.country}
        </h1>
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%", // Adjust the width as needed
            marginTop: "20px",
            borderRadius: "30px",
          }}
        >
          <CustomTextField
            label="Type Something Here"
            onChange={handleSearchChange}
            value={search}
            variant="outlined"
            size="small"
            sx={{
              width: {
                xs: "60%", // Full width on extra small screens
                sm: "25%", // 75% width on small screens
                md: "30%", // 50% width on medium screens
                lg: "15%", // 25% width on large screens
              },
              fontSize: {
                xs: "0.8rem", // Smaller font size on extra small screens
                sm: "1rem", // Default font size on small screens
                md: "1.2rem", // Larger font size on medium screens
                lg: "1.4rem", // Even larger font size on large screens
              },
              backgroundColor: "white",
              borderRadius: "30px",
            }}
          />

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={getShop}
              aria-label="fingerprint"
              sx={{
                right: "30%",
                backgroundColor: "red",
                color: "white",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "yellow", // Keep the background color red on hover
                  color: "white", // Keep the text color white on hover
                },
                "&:focus": {
                  border: "none",
                  outline: "none",
                  backgroundColor: "blue",
                },
              }}
            >
              GO
            </IconButton>
            <Select
              label="Select Language"
              defaultValue="Hindi"
              sx={{
                right: "30%",
                width: 70,
                height: 40,
                backgroundColor: "red",
                color: "white",
                borderRadius: "30px",
                outline: "none",
              }} // Adjust the size as needed
            >
              {languages.map((option) => (
                <MenuItem defa key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {/* <TextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
            {/* <IconButton
              aria-label="fingerprint"
              sx={{
                backgroundColor: "red",
                color: "white",
                fontSize: "15px",
              }}
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </IconButton> */}
          </Stack>
        </Box>

        <ChatCard
          filteredData={filteredData}
          search={search}
          jsonData={jsonData}
        />

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
