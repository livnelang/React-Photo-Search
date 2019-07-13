import React from "react";
import axios from 'axios';
import Header from "./components/header/Header";
import PhotoResults from "./components/photoResults/photoResults";
import NiceLoader from "./components/niceLoader/niceLoader";
import InfiniteScroll from "./components/infiniteScroll/infiniteScroll";

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

  componentDidMount() {
    document.title = "Flickr Gallery";
  }

  loadMorePhotos = () => {
    this.searchForPhotos(false, true)
  }

  setEmptyPhotos() {
    this.setState({ photos: [] });
  }

  searchForPhotos(tag, nextPage) {
    this.setState({ loadingPhotos: true });

    if (!nextPage) {
      this.setState({ photos: [] });
      this.lastTag = tag
    } else {
      this.setState({ page: this.state.page + 1 });
    }

    var requestObj = {
      tags: this.lastTag,
      page: this.state.page
    }

    axios.post('/searchPhotos', requestObj)
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            photos: this.state.photos.concat(response.data)
          });
        } else {
          this.setState({ photos: [] })
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
        {this.state.loadingPhotos && this.state.photos.length === 0 ? <NiceLoader /> :
          <PhotoResults photos={this.state.photos} />
        }
      </div>
    );
  }
}