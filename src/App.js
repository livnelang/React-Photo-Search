import React from "react";
import {connect} from "react-redux";
import axios from 'axios';
import Header from "./components/header/Header";
import PhotoResults from "./components/photoResults/photoResults";
import NiceLoader from "./components/niceLoader/niceLoader";
import InfiniteScroll from "./components/infiniteScroll/infiniteScroll";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.lastTag = String;
    this.state = {
      loadingPhotos: false,
      page: 1,
    }
    this.searchForPhotos = this.searchForPhotos.bind(this);
    this.setEmptyPhotos = this.setEmptyPhotos.bind(this);
  }

  componentDidMount() {
    document.title = "Flickr Gallery";
  }

  loadMorePhotos = () => {
    if(this.lastTag) {
      this.searchForPhotos(false, true)
    }
  }

  setEmptyPhotos() {
    this.lastTag = '';
    this.props.setEmptyPhotos();
  }

  searchForPhotos(tag, nextPage) {
    this.setState({ loadingPhotos: true });
    this.loadingPhotos = true;

    if (!nextPage) {
      this.props.setEmptyPhotos();
      this.lastTag = tag;
    } else {
      this.setState({ page: this.props.page + 1 });
    }

    var requestObj = {
      tags: this.lastTag,
      page: this.props.page
    }

    axios.post('/searchPhotos', requestObj)
      .then((response) => {

        if(!this.lastTag) {
          this.props.setEmptyPhotos();
          this.setState({ loadingPhotos: false });
          return;
        }

        if (response.data.length > 0) {
          this.props.setPhotos(response.data);
        } else {
          this.props.setEmptyPhotos();
        }

        this.setState({ loadingPhotos: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loadingPhotos: false });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <InfiniteScroll loadingPhotos={this.state.loadingPhotos} loadMore={this.loadMorePhotos} />
        <Header searchForPhotos={this.searchForPhotos} setEmptyPhotos={this.setEmptyPhotos} />
        {this.state.loadingPhotos && this.props.photos.length === 0 ? <NiceLoader /> :
          <PhotoResults />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    photos: state.photos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPhotos: (photos) => {
      dispatch({
        type: "SET_PHOTOS",
        payload: photos
      });
    },
    setEmptyPhotos: () => {
      dispatch({
        type: "SET_EMPTY_PHOTOS",
        payload: null
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
