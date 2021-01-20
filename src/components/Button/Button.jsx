import { Component } from 'react';
import './ButtonStyles.css';

export default class Button extends Component {
  scroll = () => this.props.onClick();

  setTimeout =
    (() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    },
    500);

  render() {
    return (
      <button onClick={this.scroll} type="button" className="Button">
        Load more
      </button>
    );
  }
}
