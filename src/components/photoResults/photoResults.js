import React, { PureComponent } from "react";
import './photoResults.css';
import Photo from "../photo/photo";
import PhotosEmptyState from '../photoEmptyState/photoEmptyState';


export default class PhotoResults extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      empty: this.props.photos.length === 0 ? true : false,
      showModal: false
    };
  }



  componentDidUpdate(prevProps, prevState) {
    if(this.props.photos.length === 0){
      this.setState({ empty: true });  
    }
  }


  render() {
    return (
        <div className="photosContainer">
          <PhotosEmptyState key={this.state.empty} empty={this.state.empty} />
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
