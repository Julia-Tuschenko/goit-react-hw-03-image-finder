import React from 'react';
import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={image}
        alt=""
        className={styles.ImageGalleryItemImage}
        onClick={onClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  bigImage: PropTypes.func,
};

export default ImageGalleryItem;
