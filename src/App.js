import React from "react";
import axios from 'axios';
import debounce from "lodash.debounce";

import Header from "./components/header/Header";
import PhotoResults from "./components/photoResults/photoResults";
import NiceLoader from "./components/niceLoader/niceLoader";



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.lastTag = String;
    this.state = {
      photos: [],
      loadingPhotos: false,
      page: 1
    };

    this.searchForPhotos = this.searchForPhotos.bind(this);
    this.setEmptyPhotos = this.setEmptyPhotos.bind(this);
  }

  componentDidMount(){
    document.title = "Flickr Gallery";
    window.addEventListener('scroll', this.handleScroll);
  }

  // Binds our scroll event handler
  handleScroll = debounce(() => {


    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (this.loadingPhotos) return;

    // Checks that the page has scrolled to the bottom
    if (( window.innerHeight + document.documentElement.scrollTop) >= (document.documentElement.offsetHeight -200 )) {
      this.loadMorePhotos();
    }
  }, 100);


  loadMorePhotos() {
    console.log('sroll to the end');
    this.searchForPhotos(false, true)
  }

  setEmptyPhotos() {
    this.setState({photos: []});
  }

  searchForPhotos(tag, nextPage) {  
    this.setState({ loadingPhotos: true});

    if(!nextPage) {
      this.setState({ photos: []});
      this.lastTag = tag
    } else {
      this.setState({ page: this.state.page + 1});
    }

    var requestObj = {
      tags: this.lastTag,
      page: this.state.page
    }
    

    axios.post('http://localhost:5000/searchPhotos', requestObj)
    .then((response) => {
      if(response.data.length > 0) {
        if(nextPage) {
          this.setState({
            photos: this.state.photos.concat(response.data)
          });
        } else {
          this.setState({
            photos: response.data
          });
        }
        
      } else {
        this.setState({
          photos: []
      })
    }

    this.setState({
      loadingPhotos: false
  })
      
    })
    .catch((error)=>{
      console.log(error);
      this.setState({
        loadingPhotos: false
      });
    });
  }


  render() {
    return (
      <div className="wrapper">
        <Header searchForPhotos={this.searchForPhotos} setEmptyPhotos={this.setEmptyPhotos}/>
        {this.state.loadingPhotos && this.state.photos.length === 0 ? <NiceLoader /> : 
          <PhotoResults photos={this.state.photos} />
        }
      </div>
    );
  }
}
