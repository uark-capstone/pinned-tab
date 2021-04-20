import React from "react";
import { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
} from "react-bootstrap";
import Logo from "../Utils/Images/logo_large.png";
import "../reportingpage.css";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

const NavigationBar = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut]=useState(false)
  useEffect(() => {
    // Update the document title using the browser API
    if(localStorage.getItem('user')) 
      setIsLoggedIn(true)

    console.log("isLogged in", isLoggedIn)
  });

  const handleClick = (e) => {
    e.preventDefault();
    console.log("The link was clicked.");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsLoggingOut(true)
  };

  const DROP_DOWN_MENU = (
    
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdownMenu">
        ☰
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu dropdown-menu-right shadow-lg">
        <Dropdown.Item href="/graph">Graphing Page</Dropdown.Item>
        <Dropdown.Item href="/predict/training">Prediction Training</Dropdown.Item>
        <Dropdown.Item href="/monitor/1/105"> WebcamCapture</Dropdown.Item>
        <Dropdown.Item href="/TeacherPage">Teacher page</Dropdown.Item>
        <Dropdown.Item onClick={handleClick}> Sign Out</Dropdown.Item>
    
      </Dropdown.Menu>
    </Dropdown>
  );

  const NAV_BAR = (
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
            />
          </Navbar.Brand>
        </Nav>
        {DROP_DOWN_MENU}
      </Navbar>
    </div>
  );


  return (
  <div>
   <div>
   {NAV_BAR}
     </div> 
    {isLoggingOut && <Redirect to="/" /> }

  </div>);
};

export default NavigationBar;
