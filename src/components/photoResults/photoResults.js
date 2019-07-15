import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './photoResults.css';
import Photo from "../photo/photo";
import PhotosEmptyState from '../photoEmptyState/photoEmptyState';
import Modal from 'react-responsive-modal';


class PhotoResults extends PureComponent {

  onCloseModal = () => {
    this.props.setSelectedImage({selected: false, url: ''});
  };

  render() {
    return (
      <div className="photosContainer">
        <PhotosEmptyState empty={this.props.photos.length === 0 } />
        {this.props.photos.map(function (item, index) {
          return <Photo key={index}
            value={item}
          />
        }, this)
        }

        <Modal open={this.props.selectedImage.selected} onClose={this.onCloseModal} center showCloseIcon={false} focusTrapped={false} >
          <img width="420" height="320" src={this.props.selectedImage.url} alt=""></img>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    selectedImage: state.selectedImage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedImage: (selectedImage) => {
      dispatch({
        type: "SET_SELECTED_IMAGE",
        payload: selectedImage
      });
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PhotoResults);