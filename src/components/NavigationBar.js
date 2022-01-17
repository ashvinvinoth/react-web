import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import FileService from "../services/FileService";



const NavigationBar = (props) => {

  const [quotes, setQuotes] = useState("");


useEffect(() => {
 FileService.getFiles().then((response) => {

      setQuotes(response.data);
        })
        
}, []);


  const guestLinks = (
    <>
      <div className="mr-auto"></div>
      <Nav className="navbar-right">
        <Link to={"register"} className="nav-link">
        <FontAwesomeIcon icon={faUserPlus} /> Register</Link>
        <Link to={"login"} className="nav-link">
        <FontAwesomeIcon icon={faSignInAlt} /> Login </Link>

    
      </Nav>
    </>
  );
  const userLinks = (
    <>
      <Nav className="mr-auto">
        {/* <Link to={"add"} className="nav-link">
          Upload Binary
        </Link>
        <Link to={"list"} className="nav-link">
          View History
        </Link> */}
        <Link to={"Post"} className="nav-link">
          View Post
        </Link>
   
      </Nav>
    
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
           <div className="navbar-brand">

        <img
          src="https://i.ibb.co/M8564Zb/icons8-upload-64.png"
          width="25"
          height="25"
          alt="brand"
        />{" "}
          Post Application
     
 
  </div>


 {console.log('CBBCBCC',quotes)}
  {quotes ? userLinks : guestLinks} 


    </Navbar>
  );
};

export default NavigationBar;
