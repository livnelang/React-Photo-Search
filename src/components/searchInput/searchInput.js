import React, { PureComponent } from "react";
import './searchInput.css';
import { FaSearch } from 'react-icons/fa';


export default class SearchInput extends PureComponent {
  constructor(props) {
    super();
    this.state = {value: ''};
  }
  
  handleClick() {
    this.props.textChange(this.state.value);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.handleClick();
    }
  }

  render() {
    return (
        <div className="searchContainer">
          <input type="text" placeholder="Search.." 
              value={this.state.value} 
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}>
            </input>
          <button type="button" className="btn btn-success" onClick={() => {this.handleClick()}}>
            <FaSearch />
          </button>
        </div>
    );
  }
}
