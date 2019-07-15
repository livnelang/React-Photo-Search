import React from 'react'
import photoAlbum from './photo_album.png';

export default function PhotosEmptyState(props) {
    if (!props.empty) {
      return null;
    }
  
    return (
      <div className="photoEmptyState">
        <img width="150" src={photoAlbum} alt="photoAlbum"/>
      </div>
    );
  }