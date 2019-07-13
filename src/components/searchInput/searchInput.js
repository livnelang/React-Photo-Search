import React, { PureComponent } from "react";
import './searchInput.css';
import { FaSearch } from 'react-icons/fa';


export default class SearchInput extends PureComponent {
  
  handleClick() {
    this.props.textChange(this.searchText.value);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleClick();
    }
  }

  clear() {
    this.searchText.value = '';
  }

  render() {
    return (
        <div className="searchContainer">
          <input type="text" placeholder="Search.." 
              ref={input => this.searchText = input}
              onKeyPress={this.handleKeyPress}>
            </input>
          <button type="button" className="btn btn-success" onClick={() => {this.handleClick()}}>
            <FaSearch />
          </button>
        </div>
    );
  }
}
