import { Component } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './LoaderStyles.css';

export default class App extends Component {
  render() {
    return (
      <Loader
        className="Loader"
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }
}
