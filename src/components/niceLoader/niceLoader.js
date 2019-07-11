import React, { PureComponent } from "react";
import './niceLoader.css';

export default class NiceLoader extends PureComponent {
  render() {
    return (
        <div className="lds-ripple">
            <div>
                </div><div>
            </div>
        </div>
    );
  }
}
