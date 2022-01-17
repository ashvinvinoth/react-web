import React, { Component } from "react";


import "../../assets/css/Style.css";
import {
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import axios from "axios";
import FileService from "../../services/FileService";
import AuthService from "../../services/AuthService";


class UploadHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search: "",
      currentPage: 1,
      booksPerPage: 5,
      fileInfos:[],
      username:"",
      role:"",
      logout:null,
      approved:null
      // sortDir: "asc",
    };
  }


  componentDidMount() {

    FileService.getFiles().then((response) => {
      
      var a=this;
 
         a.setState({fileInfos:response.data});
    });

    AuthService.getUserDetails().then((response)=>{
  
      this.setState({role:response.data.role});
      this.setState({username:response.data.username});
  
        
      });

  }

 

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllFiles(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllFiles(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllFiles(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllFiles(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.booksPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllFiles(this.state.currentPage + 1);
      }
    }
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllFiles(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8081/rest/upload/search/" +
          this.state.search +
          "?page=" +
          currentPage +
          "&size=" +
          this.state.booksPerPage
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      });
  };

  updateFile(type){

   
    FileService.updateFile(type);

    this.setState({
      approved:'success'
    });
   

    setTimeout(() => {
      window.location.reload();
   }, 400);
  }

  downloadFile(id,name){
    FileService.downloadFile(id,name);
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
    const { books, currentPage, totalPages, search } = this.state;

    return (


      <div>

{this.state.logout && (
     <div style={{display: 'flex', justifyContent:'flex-end'}}>
<div>
  <MyToast  show={true}  message={"Logout Successfully"} type={"success"} />
  </div>
      
        </div>
      )}

{this.state.approved && (
     <div style={{display: 'flex', justifyContent:'flex-end'}}>
<div>
  <MyToast  show={true}  message={"Approved"} type={"success"} />
  </div>
      
        </div>
      )}

<Card.Header style={{ textAlign: "right" }}>
          <button style={{backgroundColor:'#D5CE01'}} onClick={() =>this.logout()}><h7>Logout</h7></button>
          </Card.Header>  
          <Card.Header style={{ textAlign: "right" }}>
        <div style={{ color: 'white' }}><b>User: {this.state.username}</b></div> 
        <div style={{ color: 'white' }}><b>Role: {this.state.role}</b></div> 
            </Card.Header>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"File Deleted Successfully."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <div style={{ float: "left" }}>
              <FontAwesomeIcon icon={faList} /> History
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <FormControl
                  placeholder="Search"
                  name="search"
                  value={search}
                  className={"info-border bg-dark text-white"}
                  onChange={this.searchChange}
                />
                <InputGroup.Append>
                  <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={this.searchData}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    type="button"
                    onClick={this.cancelSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                <th>User Name</th>
                  <th>Uploaded File</th>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {this.state.fileInfos.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">No Data's Available.</td>
                  </tr>
                ) : (
                  this.state.fileInfos && this.state.fileInfos.map((file, index ) => (

                    console.log('BCBCVCVCV',this.state.fileInfos),
                    <tr key={file.id}>
                    <td>{file.uploadby}</td>
                    <th>{file.name}</th>
                      <td>{file.size}</td>
                      <td>{file.type}</td>
                      <td>  <button  onClick={() =>this.downloadFile(file.size,file.name)}>Download</button>
                      </td>
                      <td>
                      {!file.userStatus ? (
                        this.state.role =='ADMIN' ?(

                          <button style={{backgroundColor:'#C8C107'}} onClick={() =>this.updateFile(file.size)}>Approve</button> 

):
 <button style={{backgroundColor:'#FF0000'}} >Pending</button> 

): <button style={{backgroundColor:'#058001'}}>Signed</button>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {books.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    className={"page-num bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Append>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}
        </Card>
      </div>
    );
  }
}


export default UploadHistory;
