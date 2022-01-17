import React, { Component } from "react";
import "./App.css";
import Login from './components/User/login';
import Welcome from './components/Welcome';
import { BrowserRouter as Router,Switch, Route, Link } from "react-router-dom";
import Logout from "./components/User/logout";
import NavigationBar from "./components/NavigationBar";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Upload from "./components/Upload/Upload";
import UploadHistory from "./components/Upload/UploadHistory";
import Post from "./components/Upload/Post";

import Register from "./components/User/Register";

import CardView from "./components/Upload/CardView";

class App extends Component {
 render() {
    return(
      <Router>
         <NavigationBar />
         <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
      <Switch>
  
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" component={Login} />
        <Route path="/Post" exact component={Post} />
        <Route path="/add" exact component={Upload} />
        <Route path="/list" exact component={UploadHistory} />
        {/* <Route path="/Post" exact component={Post} /> */}
        <Route exact path="/logout" Component={Logout}/>
        <Route exact path="/card" Component={CardView}/>
        <Route path="/register" exact component={Register} />

      </Switch>
      </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
    )
  }
}
export default App;
