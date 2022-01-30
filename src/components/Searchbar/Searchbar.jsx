import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './Searchbr.module.css';
import { ImSearch } from 'react-icons/im';

export default class Searchbar extends Component {
  state = {
    artName: '',
  };

  handleNameChange = event => {
    this.setState({ artName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.artName.trim() === '') {
      return toast('Очень смешно, но с названием будет попроще!');
    }
    this.props.onSubmit(this.state.artName);
    this.setState({ artName: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>
              <ImSearch /> Search
            </span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.artName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.protoType = {
  artName: PropTypes.string,
};
