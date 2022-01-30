import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/index';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ pictures, bigImage }) => {
  return (
    <ul className={styles.ImageGallery}>
      {pictures.map(({ id, webformatURL, largeImageURL }) => {
        const handleItemClick = () => bigImage(largeImageURL);

        return (
          <ImageGalleryItem
            key={id}
            image={webformatURL}
            onClick={handleItemClick}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  pictures: PropTypes.array,
  bigImage: PropTypes.func,
};

export default ImageGallery;
