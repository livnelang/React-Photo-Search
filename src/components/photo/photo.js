import React, { PureComponent } from "react";
import './photo.css';
import Modal from 'react-responsive-modal';


export default class Photo extends PureComponent {
  state = {
    open: false,
  };
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
        <div className="photo">
            <img src={this.props.value.url_o} alt=" " onClick={this.onOpenModal}></img>

            <Modal open={this.state.open} onClose={this.onCloseModal} center showCloseIcon={false} focusTrapped={false} >
              <img width="420" height="320" src={this.props.value.url_o} alt=""></img>
            </Modal>  
        </div>
    );
  }
}
