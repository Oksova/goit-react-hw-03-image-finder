import { Component } from 'react';
import './ButtonStyles.css';
import PropTypes from 'prop-types';

export default class Button extends Component {
  scroll = () => {
    this.props.onClick();
  };

  setTimeout =
    (() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    },
    300);

  render() {
    return (
      <button onClick={this.scroll} type="button" className="Button">
        Load more
      </button>
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func,
};
