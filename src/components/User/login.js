import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../../services/AuthService";

import {
  Row,
  Col,
  Card,
  InputGroup,
  Form as formDesign,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faEnvelope,
  faLock,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

import MyToast from "../MyToast";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/Post");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {

    return (
<div>
      {this.state.message && (
     <div style={{display: 'flex', justifyContent:'flex-end'}}>
<div style={this.state.show} >
  <MyToast  show={this.state.show}  message={"Authentication Failed"} type={"danger"} />
  </div>
      
        </div>
      )}
      <Row className="justify-content-md-center">
      <Col xs={5}>


 
        
  
      <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Card.Header>
  
  
      <br/>

      <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
      <Card.Body>
            <formDesign.Row>
              <formDesign.Group as={Col}>

              <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                    className={"bg-dark text-white"}
                    placeholder="Enter Email Address"
                  />
                </InputGroup>

                
          </formDesign.Group>
            </formDesign.Row>

            <formDesign.Row>
              <formDesign.Group as={Col}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faLock} />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                    className={"bg-dark text-white"}
                    placeholder="Enter Password"
                  />
                </InputGroup>
              </formDesign.Group>
            </formDesign.Row>
        
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
  

          </Card.Body>

          <Card.Footer style={{ textAlign: "right" }}>

     
            <Button
              size="sm"
              type="button"
              variant="success"
              disabled={this.state.loading}
              onClick={this.handleLogin}

            >
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Button>{" "}
            <Button
              size="sm"
              type="button"
              variant="info"
            
            >
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
          </Card.Footer>
          </Form>
        </Card>
      </Col>
    </Row>
    </div>
    );
  }
}