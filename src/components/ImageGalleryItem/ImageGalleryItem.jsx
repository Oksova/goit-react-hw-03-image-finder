import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import './ImageGalleryItemStyles.css';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { src, alt, largePicture } = this.props;
    const { showModal } = this.state;

    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.toggleModal}
          src={src}
          alt={alt}
          className="ImageGalleryItemImage"
        />
        {showModal && (
          <Modal onClose={this.toggleModal} src={largePicture} alt={alt} />
        )}
      </li>
    );
  }
}
