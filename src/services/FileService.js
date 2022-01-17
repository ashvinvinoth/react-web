import axios from 'axios';
import authHeader from './authHeader';


const API_URL = 'http://localhost:8090/api/';
class FileService{
    
        uploadFile(FileData){
            console.log(FileData)
            let formData = new FormData();
       
            formData.append("file",FileData );
            let newfile = formData.get('file');
     
       
        
            return axios
            .post(API_URL + "upload",formData, {headers:authHeader(),
                'Accept': 'application/json','Content-Type': 'multipart/form-data',
                'credentials': 'include', 'Access-Control-Allow-Origin':'*' });  
            };

            registerUser(reguser){
            
                return axios
                .post(API_URL + "registerUser",reguser, {headers:authHeader(),
                    'Accept': 'application/json','Content-Type': 'multipart/form-data',
                    'credentials': 'include', 'Access-Control-Allow-Origin':'*' });  
                };

            updateFile(uploadedate){

                let formData = new FormData();
                 formData.append("date",uploadedate );

                return axios
                .post(API_URL + "updateFiles",formData, {headers:authHeader(),
                    'Accept': 'application/json','Content-Type': 'multipart/form-data',
                    'credentials': 'include', 'Access-Control-Allow-Origin':'*' });  
            }

            getFiles(){
                return axios.get(API_URL+"fetchFiles",{headers:authHeader()});
            }
                //download a file
            downloadFile(id,filename){
           
                return axios.get(API_URL+"files/"+id,{headers:authHeader()}).then((response)=>{
                    console.log("response");
                    console.log(response);
                    if(response.status===200){
                        const url=window.URL.createObjectURL(new Blob([response.data]));
                        const link=document.createElement('a');
                        link.href=url;
                        link.setAttribute('download',filename);
                        document.body.appendChild(link);
                        link.click();
                    }
                });
            }

        
    }
        
        export default new FileService();










       
         
