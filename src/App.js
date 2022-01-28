import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';

export default class App extends Component {
  state = {
    artName: '',
  };

  handleFormSubmit = artName => {
    this.setState({ artName });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    );
  }
}

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
