import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import PicturesInfo from './components/PicturesInfo/PicturesInfo';

export default class App extends Component {
  state = {
    picturesName: '',
  };

  handleSubmitForm = picturesName => {
    this.setState({ picturesName });
    console.log('request handleSubmitForm ');
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmitForm} />
        <PicturesInfo picturesName={this.state.picturesName} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}
