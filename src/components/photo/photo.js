import React, { PureComponent } from "react";
import './photo.css';

export default class Photo extends PureComponent {

  render() {
    return (
        <div className="photo">
            <img src={this.props.value.url_o} alt=" "></img>
        </div>
    );
  }
}
