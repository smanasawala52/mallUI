import React from "react";
import Home from "./Home";
import ChatPage from "./ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={isAuthenticate ? <Navbar /> : <SignIn />} /> */}
        <Route exact path="/:id" element={<Home />} />
        <Route exact path="/chat" element={<ChatPage />} />
        {/* <Route exact path="/products" element={<ProductsCard />}>
          <Route index element={<ProductsCard />} />
        </Route> */}
        {/* 
        <Route exact path="/addproducts" element={<Addproducts />} />
        <Route exact path="/addcustomer" element={<Addcustomer />} />
        <Route
          exact
          path="/editcustomer/:customerId"
          element={<Editcustomer />}
        />
        <Route exact path="/editproduct/:productId" element={<Editproduct />} />
        <Route
          exact
          path="/editproductonadd/:productId"
          element={<Editproductonadd />}
        />

        <Route exact path="/cart" element={<Addtocart />} />
        <Route
          exact
          path="/getquotation/:customerId"
          element={<Getquotation />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
