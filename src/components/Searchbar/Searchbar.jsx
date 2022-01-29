import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './index';

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
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
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

// const Searchbar = (onSubmit) => {
//     return (
//     <header class="searchbar">
//     <form class="form">
//         <button type="submit" class="button">
//         <span class="button-label">Search</span>
//         </button>

//         <input
//         class="input"
//         type="text"
//         autocomplete="off"
//         autofocus
//         placeholder="Search images and photos"
//         />
//     </form>
//     </header>
//     );
//   };

//   export default Searchbar;
