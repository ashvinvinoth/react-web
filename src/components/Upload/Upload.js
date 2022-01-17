import React, { Component } from "react";


import { Card, Form, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

import FileService from "../../services/FileService";
import AuthService from "../../services/AuthService";


const fs = require('fs');
class Upload extends Component {
  
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {

      show: false,
      fileData: null,
      base64URL: "",
      selectedFile: null,
      loaded:0,
      selectedFileData: null,
      uploaded: false,
      logout:null
    };

    this.handleChecked = this.handleChecked.bind(this);
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
  }

  initialState = {
    id: "",
    file_name: "",
    comments: "",
  
  };

  componentDidMount() {
    const uploadId = +this.props.match.params.id;
    if (uploadId) {
      this.findUploadById(uploadId);
    }

    AuthService.getUserDetails().then((response)=>{
   
    
  
      this.setState({role:response.data.role});
      this.setState({username:response.data.username});
  
        
      });
  }



  findUploadById = (uploadId) => {
    this.props.fetchfile(uploadId);

  
    setTimeout(() => {
      let upload = this.props.uploadObject.upload;

      if (upload != null) {
    
        this.setState({
          id: upload.id,
          file: upload.file,
          comments: upload.comments,
        });
      }
    }, 1000);
  };

  resetupload = () => {

  };

  submitupload = (event) => {
  
  };

  updateFile = (event) => {
    event.preventDefault();

  };

  uploadChange = (event) => {

  };

  UploadHistory = () => {
    return this.props.history.push("/list");
  };





  fileData = () => { 
    if (this.state.selectedFile) { 
        
      return ( 
        <div> 
          <h2>File Details:</h2> 
          <p>File Name: {this.state.selectedFile.name}</p> 
          <p>File Type: {this.state.selectedFile.type}</p> 
          <p> 
            Last Modified:{" "} 
            {this.state.selectedFile.lastModifiedDate.toDateString()} 
          </p> 
        </div> 
      ); 
    } else { 
    
    } 
  }; 

  handleChecked(b){
    this.setState({
      selectedFileData: b
    })
}

  uploadedImage(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log('file = ', file); //I can see the file's info
    reader.onload = () => {
       var array = new Uint32Array(reader.result); // read the actual file contents
       console.log("_+_array:", array); // the array is empty!
       var binaryString = String.fromCharCode.apply(null, array);
    

     this.handleChecked(binaryString);
 
    }
    reader.readAsArrayBuffer(file)
 }

 onFileChangeHandler = (e) => {
  this.setState({
      message: ""
    });


  e.preventDefault();   
  FileService.uploadFile(e.target.files[0]).then(res => {
      console.log('BCGCGCGCCC', res);
      if(res.status===200) {

          console.log(res.data);
          this.setState({
              message: res.data,
    });

    this.setState({
      show: true
    })
   

  setTimeout(() => {
    <MyToast  show={this.state.show}  message={"File uploaded successfully."} type={"success"} />
    window.location.reload();
  }, 1500);          
         
          return  FileService.getFiles();
         
      };
  },error=>{
  const resMessage =
  (error.response &&
    error.response.data &&
    error.response.data.message) ||
  error.message ||
  error.toString();

this.setState({
  message: resMessage });
})
};

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
    const { file, comments, price } =
      this.state;

    return (
      <div>

{this.state.logout && (
     <div style={{display: 'flex', justifyContent:'flex-end'}}>
<div>
  <MyToast  show={true}  message={"Logout Successfully"} type={"success"} />
  </div>
      
        </div>
      )}
        
<Card.Header style={{ textAlign: "right" }}>

  
          <button style={{backgroundColor:'#D5CE01'}} onClick={() =>this.logout()}><h7>Logout</h7></button>
<br/>
         
          </Card.Header>  
      
        <Card.Header style={{ textAlign: "right" }}>
        <div style={{ color: 'white' }}><b>User: {this.state.username}</b></div> 
        <div style={{ color: 'white' }}><b>Role: {this.state.role}</b></div> 
            </Card.Header>
  
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "upload Updated Successfully."
                : "upload Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>

      

          <Card.Header >
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Upload Files" : "Upload Files"}
          </Card.Header>  

      
          <Form
            onReset={this.resetupload}
            onSubmit={this.state.id ? this.updateFile : this.submitupload}
            id="uploadFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Upload Documents </Form.Label>
                  <InputGroup>
               
        <div>
                  <div> 
               
                <input type="file" name="file" onChange={this.onFileChangeHandler}/>

            </div> 
          {this.fileData()} 
        </div> 
      
                  </InputGroup>
                </Form.Group>
               
              </Form.Row>
     

            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
        <div>Post Application</div> 
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}



export default Upload;
