/** @format */

// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User</Link>
        </li>
        <li>
          <Link to="/addUser">Add User</Link>
        </li>
        <li>
          <Link to="/event">Event</Link>
        </li>
        <li>
          <Link to="/addevent">Add Event</Link>
        </li>
        <li>
          <Link to="/eventRSVP">EventRSVP</Link>
        </li>
        <li>
          <Link to="/addRSVP">Add EventRSVP</Link>
        </li>
        <li>
          <Link to="/eventinvite">Event Invite</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
