import { Component } from 'react';
import searchApi from '../../services/searchApi';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/index';
import ImageGallery from '../ImageGallery/index';
import Button from '../Button/index';
import Loader from '../Loader/index';
import Modal from '../Modal/index';
import css from './index';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

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
    if (prevState.artName !== this.state.artName) {
      this.fetchPictures();
    }
    if (this.state.page !== 2 && prevState.page !== this.state.page) {
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
      .catch(error => this.setState({ error: 'Picture not found' }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = artName => {
    this.setState({ artName });
  };

  render() {
    const { pictures, isLoading, error, showModal, largeImage, imgTags } =
      this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <h1>{error}</h1>}

        <ImageGallery pictures={pictures} bigImage={this.bigImage} />
        {isLoading && <Loader />}
        {pictures.length > 11 && !isLoading && (
          <Button onClick={this.fetchPictures} />
        )}
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

// export default class App extends Component {
//   state = {
//     art: null,
//     loading: false,
//   }

//   componentDidMount(){
//     // const BASE_URL = `https://pixabay.com/api/`;
//     // const KEY = '24399696-8e36fcdd9504681aa333f9a82';
//     this.setState({ loading: true });
//     fetch('https://pixabay.com/api/?q=cat&page=1&key=24399696-8e36fcdd9504681aa333f9a82&image_type=photo&orientation=horizontal&per_page=20')
//     .then(res => res.json())
//     .then(art => this.setState({art}))
//     .finally(() => this.setState({ loading: false }));

//   }

//   render(){
//     return (
//       <div >
//          <Searchbar />
//          {this.state.loading && <h1>Загрузка...</h1>}
//          {this.state.art && (<div>{this.state.art.tags}</div>)}
//       </div>
//     );
//   }
// }
