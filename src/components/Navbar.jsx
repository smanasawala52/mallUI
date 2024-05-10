import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../components/Images/logo2.png";
import { styled } from "@mui/material/styles";

const API_URL = "https://vivomall-3f02390eda90.herokuapp.com";

const drawerWidth = 240;
const navItems = ["Home", "About Us", "Contact Us", "Mall Details"];

const CustomTextField = styled(TextField)({
  // "& .MuiInput-input": {
  //   color: "white",
  // },
  // "&.MuiInput-colorSecondary": {
  //   color: "white",
  // },
  "&  .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white", // Set border bottom color to white
  },
  "& label": {
    color: "white", // Set default text color to white
  },

  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      boxShadow: "0 0 30px white",
      borderColor: "white",
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
      backgroundColor: "white", //for background set
      boxShadow: "0 0 60px white",
      color: "grey",
    },
  },
});

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(false); // State for search visibility

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setSearchVisible((prevState) => !prevState); // Toggle search visibility
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {props.jsonData[0]?.name}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "red" }}>
        <Toolbar>
          {props.jsonData[0]?.images?.map(
            (logo, index) =>
              logo.imgType === "LOGO" && (
                <img
                  alt="Logo"
                  style={{ height: "50px", margin: "0" }}
                  src={API_URL + logo.imgUrl}
                  loading="lazy"
                />
              )
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              color: "red",
            }}
          >
            MUI
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                className="nav-btn"
                key={item}
                sx={{
                  color: "#fff",
                  "& .MuiButton-label": {
                    // Target the label of the Button
                    fontFamily: "serif",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              position: "absolute",
              right: 0,
            }}
          >
            <MenuIcon />
          </IconButton>
          {searchVisible && ( // Conditionally render the TextField based on searchVisible state
            <CustomTextField
              label="Search"
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
                // Add any other responsive styles here
              }}
            />
          )}

          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
            onClick={toggleSearch}
            sx={{
              "&:focus": {
                border: "none",
                outline: "none",
              },
            }}
          >
            <SearchIcon />
          </IconButton>
          {/* <button
            style={{
              border: "none",
              background: "none",
              color: "white",
              edge: "end",
            }}
            onClick={toggleSearch}
          >
            <SearchIcon />
          </button> */}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          unde fugit veniam eius, perspiciatis sunt? Corporis qui ducimus
          quibusdam, aliquam dolore excepturi quae. Distinctio enim at eligendi
          perferendis in cum quibusdam sed quae, accusantium et aperiam? Quod
          itaque exercitationem, at ab sequi qui modi delectus quia corrupti
          alias distinctio nostrum. Minima ex dolor modi inventore sapiente
          necessitatibus aliquam fuga et. Sed numquam quibusdam at officia
          sapiente porro maxime corrupti perspiciatis asperiores, exercitationem
          eius nostrum consequuntur iure aliquam itaque, assumenda et! Quibusdam
          temporibus beatae doloremque voluptatum doloribus soluta accusamus
          porro reprehenderit eos inventore facere, fugit, molestiae ab officiis
          illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis,
          voluptatem! Cumque, eligendi unde aliquid minus quis sit debitis
          obcaecati error, delectus quo eius exercitationem tempore. Delectus
          sapiente, provident corporis dolorum quibusdam aut beatae repellendus
          est labore quisquam praesentium repudiandae non vel laboriosam quo ab
          perferendis velit ipsa deleniti modi! Ipsam, illo quod. Nesciunt
          commodi nihil corrupti cum non fugiat praesentium doloremque
          architecto laborum aliquid. Quae, maxime recusandae? Eveniet dolore
          molestiae dicta blanditiis est expedita eius debitis cupiditate porro
          sed aspernatur quidem, repellat nihil quasi praesentium quia eos,
          quibusdam provident. Incidunt tempore vel placeat voluptate iure
          labore, repellendus beatae quia unde est aliquid dolor molestias
          libero. Reiciendis similique exercitationem consequatur, nobis placeat
          illo laudantium! Enim perferendis nulla soluta magni error, provident
          repellat similique cupiditate ipsam, et tempore cumque quod! Qui, iure
          suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore
          commodi reprehenderit rerum reiciendis! Quidem alias repudiandae eaque
          eveniet cumque nihil aliquam in expedita, impedit quas ipsum nesciunt
          ipsa ullam consequuntur dignissimos numquam at nisi porro a, quaerat
          rem repellendus. Voluptates perspiciatis, in pariatur impedit, nam
          facilis libero dolorem dolores sunt inventore perferendis, aut
          sapiente modi nesciunt.
        </Typography>
      </Box> */}
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;