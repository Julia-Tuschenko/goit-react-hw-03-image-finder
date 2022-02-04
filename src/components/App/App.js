import React, { Component } from 'react';
import searchApi from '../../services/searchApi';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/index';
import ImageGallery from '../ImageGallery/index';
import Button from '../Button/index';
import Loader from '../Loader/index';
import Modal from '../Modal/index';
import styles from './App.module.css';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default class App extends Component {
  state = {
    artName: '',
    pictures: [],
    page: 1,
    largeImage: '',
    imgTags: '',
    error: '',
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const newName = prevState.artName;
    const oldName = this.state.artName;

    const oldPage = this.state.page;
    const newPage = prevState.page;

    if (newName !== oldName) {
      this.fetchPictures();
    }
    if (oldPage !== 2 && newPage !== oldPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  bigImage = (largeImage = '') => {
    this.setState({ largeImage });

    this.toggleModal();
  };

  fetchPictures = () => {
    const { page, artName } = this.state;

    const options = {
      page,
      artName,
    };

    this.setState({ isLoading: true });

    searchApi(options)
      .then(pictures => {
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error: toast('Picture not found') }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = artName => {
    this.setState({ artName: artName, page: 1, pictures: [], error: null });
  };

  render() {
    const { pictures, isLoading, error, showModal, largeImage, imgTags } =
      this.state;
    const btnEnable = pictures.length > 0 && !isLoading && error === null;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <h1>{error}</h1>}

        <ImageGallery pictures={pictures} bigImage={this.bigImage} />
        {isLoading && <Loader />}
        {btnEnable && <Button onClick={this.fetchPictures} />}
        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}

App.propTypes = {
  pictures: PropTypes.array,
  page: PropTypes.number,
  query: PropTypes.string,
  largeImage: PropTypes.string,
  imgTags: PropTypes.string,
  error: PropTypes.string,
  showModal: PropTypes.bool,
  isLoading: PropTypes.bool,
};
