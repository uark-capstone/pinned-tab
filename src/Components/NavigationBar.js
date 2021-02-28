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
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Logo}
            width="100px"
            height="100px"
            className="navbar-brand"
          />{" "}
          Here's how you did today:
        </Navbar.Brand>
</Nav>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdownMenu">
              ☰
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow-lg">
            <Dropdown.Item href="#/action-1">Save</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Share</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Report Error</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Sign In</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

    
      </Navbar>
    </div>
  );
};

export default NavigationBar;
