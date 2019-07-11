import React, { PureComponent } from "react";

export default class PhotoModal extends PureComponent {
  
  render() {
    return (
        <div className="modal fade" id="photoModal">
            <div className="modal-dialog modal-sm">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Modal Heading</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body">
                    Modal body..
                </div>
            </div>
            </div>
        </div>
    );
  }
}
