import React, { PureComponent } from "react";
import './photoResults.css';
import Photo from "../photo/photo";
import photoAlbum from './photo_album.png';



function PhotosEmptyState(props) {
  if (!props.empty) {
    return null;
  }

  return (
    <div className="photoEmptyState">
      <img width="150" src={photoAlbum} alt="photoAlbum"/>
    </div>
  );
}


export default class PhotoResults extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empty: this.props.photos.length === 0 ? true : false,
      showModal: false
    };
  }

  render() {
    return (
        <div className="photosContainer">
          <PhotosEmptyState empty={this.state.empty} />
          { this.props.photos.map(function(item, index) {
                return <Photo key={index} 
                              value={item} 
                        />
            }, this)
          }

        </div>
    );
  }
}
