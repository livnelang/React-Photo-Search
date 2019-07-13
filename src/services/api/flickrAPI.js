import axios from 'axios';

export default class FlickrAPI {


  searchForPhotos(requestObj) {


    axios.post('/searchPhotos', requestObj);  
    
    // .then((response) => {
    //   if(response.data.length > 0) {
    //     if(nextPage) {
    //       return(statePhotos.concat(response.data));
    //     } else {
    //       return(response.data);
    //     }
    //   } else {
    //     return([]);
    //   }
    // })
    // .catch((error)=>{
    //   return(error);
    // });
  }
  
}

