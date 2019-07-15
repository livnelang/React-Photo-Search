import React, { PureComponent } from "react";
import { connect } from "react-redux";
import './searchInput.css';
import { FaSearch } from 'react-icons/fa';


class SearchInput extends PureComponent {

  handleClick() {
    this.props.textChange(this.searchText.value);
  }

  handleKeyPress = (event) => {
    if (!this.searchText.value) {
      this.props.setEmptyPhotos();
    }

    else if (event.key === 'Enter') {
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
        <button type="button" className="btn btn-success" onClick={() => { this.handleClick() }}>
          <FaSearch />
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEmptyPhotos: () => {
      dispatch({
        type: "SET_EMPTY_PHOTOS",
        payload: null
      });
    }
  };
};


export default connect(null, mapDispatchToProps)(SearchInput);