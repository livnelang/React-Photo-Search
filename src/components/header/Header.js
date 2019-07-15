import React, { PureComponent } from "react";
import './header.css';
import logo from './images_search.png';
import SearchInput from "../searchInput/searchInput";


export default class Header extends PureComponent {
  constructor(props){
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resetImages = this.resetImages.bind(this);
    this.inputRef = React.createRef();
  }
  
  handleSearchChange(value) {
    this.props.searchForPhotos(value);
  };

  resetImages() {
    this.props.setEmptyPhotos();
    // this.inputRef.clear();
  };

  render() {
    return (
      <div className="topPanel">
        <div className="flex" onClick={this.resetImages}>
          <span>Photo Search Engine </span>
          <img src={logo} alt="Logo"/>
        </div>
        <SearchInput textChange={this.handleSearchChange}/>
      </div>
    );
  }
}
