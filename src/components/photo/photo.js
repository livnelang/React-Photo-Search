import React, { PureComponent } from "react";
import {connect} from "react-redux";
import './photo.css';

 class Photo extends PureComponent {
 
  onImageClick = () => {
    this.props.setSelectedImage({selected: true, url: this.props.value.url_o});
  };

  render() {
    return (
        <div className="photo">
            <img src={this.props.value.url_o} alt=" " onClick={this.onImageClick}></img>
        </div>
    );
  }
}




const mapStateToProps = (state) => {
  return {
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


export default connect(mapStateToProps, mapDispatchToProps)(Photo);