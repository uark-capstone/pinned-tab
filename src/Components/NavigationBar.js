import React from "react";
import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  FormControl,
  Form,
  Dropdown,
} from "react-bootstrap";
import Logo from "../Images/logo_large.png";
import "../reportingpage.css";


const NavigationBar = () => {
  return (
    <div>
      <Navbar className="navbar container-fluid navbar-default shadow p-3 mb-5 rounded">
        <Nav className="mr-auto">
          <Navbar.Brand href="/graph">
            <img
              alt=""
              src={Logo}
              width="100px"
              height="100px"
              className="navbar-brand"
            />{" "}
            {/* Here's how you did today: */}
          </Navbar.Brand>
        </Nav>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdownMenu">
              ☰
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow-lg">
            {/* <Dropdown.Item href="#">Save</Dropdown.Item>
            <Dropdown.Item href="#">Share</Dropdown.Item>
            <Dropdown.Item href="#">Report Error</Dropdown.Item> */}
            <Dropdown.Item href="/graph">Graphing Page</Dropdown.Item>
            <Dropdown.Item href="/monitor/1/105">Webcam WebcamCapture</Dropdown.Item>
            <Dropdown.Item href="/signIn">Sign In</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
