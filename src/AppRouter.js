/** @format */

// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import { Home } from "./Components/Home.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import User from "./Components/UserList.js";
import Event from "./Components/EventList.js";
import EventRSVP from "./Components/EventRSVPList.js";
import EventInvite from "./Components/EventInvite.js";
import AddUser from "./Components/AddUser.js";
import AddEvent from "./Components/AddEvent.js";
import AddRSVP from "./Components/AddRSVP.js";

const AppRouter = () => {
	return (
    <Router>
      <Navbar />
      <ToastContainer
        toastStyle={{
          fontFamily: "monospace",
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/event" element={<Event />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/eventRSVP" element={<EventRSVP />} />
        <Route path="/addRSVP" element={<AddRSVP />} />
        <Route path="/eventinvite" element={<EventInvite />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
