import React, { Component } from "react";
import "../../assets/css/Style.css";
import Card from "./Card";
import "../styles/cards.css";
import MyToast from "../MyToast";

import { Card as LogoutCard, Form, Col, InputGroup } from "react-bootstrap";

import AuthService from "../../services/AuthService";
const commentsOne = [
  {
    user: "Ashvin",
    text: "Woah dude, this is awesome! 🔥",
    id: 1,
  },
  {
    user: "Rajesh",
    text: "Like!",
    id: 2,
  },
  {
    user: "Priya",
    text: "Niceeeee!",
    id: 3,
  },
];

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
   
      posts: [],
        comments: [],
        logout:null,
      // sortDir: "asc",
    };
  }

  logout(){

    this.setState({
      logout:'success'
    });
  
    AuthService.logout();
    // <MyToast  show={this.state.show}  message={"File uploaded successfully."} type={"success"} />
  
    setTimeout(() => {
       this.props.history.push("/login");
    }, 400);
  
  }
  render() {

    return (

      
      <div>

{this.state.logout && (
     <div style={{display: 'flex', justifyContent:'flex-end'}}>
<div>
  <MyToast  show={true}  message={"Logout Successfully"} type={"success"} />
  </div>
      
        </div>
      )}
      <LogoutCard.Header style={{ textAlign: "right" }}>

  
<button style={{backgroundColor:'#D5CE01'}} onClick={() =>this.logout()}><h7>Logout</h7></button>
<br/>

</LogoutCard.Header>  

<div className="cards">

      <Card
        accountName="Ashvin"
        storyBorder={true}
        image="https://picsum.photos/800/900"
        comments={commentsOne}
        likedByText="ashvin"
        likedByNumber={40}
        hours={7}
      />

<Card
        accountName="Kumar"
        storyBorder={true}
        image="https://picsum.photos/800/1000"
        comments={commentsOne}
        likedByText="vinoth"
        likedByNumber={20}
        hours={12}
      />
  </div>
    </div>

    );
  }
}


export default Post;
