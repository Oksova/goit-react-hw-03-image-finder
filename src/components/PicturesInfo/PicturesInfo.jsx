import { Component } from 'react';
import apiService from '../../services/apiService';
import ImageGallery from '../ImageGallery/';
import PicturesErrorView from '../PicturesErrorView/PicturesErrorView';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import PropTypes from 'prop-types';

export default class PicturesInfo extends Component {
  state = {
    pictures: [],
    page: 1,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.picturesName;
    const nextRequest = this.props.picturesName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    console.log('componentDidUpdate PicturesInfo Start');

    if (prevRequest !== nextRequest) {
      this.setState({ page: 1 });
      console.log('PrevPage !== NextPage', this.setState);
      console.log('page in check');
    }

    if (prevRequest !== nextRequest || prevPage !== nextPage) {
      this.setState({ status: 'pending' });
      apiService
        .fetchPictures(nextRequest, nextPage)
        .then(newPictures => {
          if (newPictures.total !== 0) {
            this.setState(prevState => ({
              pictures: [...prevState.pictures, ...newPictures.hits],
              status: 'resolved',
            }));
            console.log('`Картинки из фетча` : newPictures');
            return;
          }
          return Promise.reject(new Error('Invalid request'));
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log('page');
  };

  render() {
    const { pictures, error, status, page } = this.state;

    if (status === 'idle') {
      return <h1>Введите свой запрос</h1>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      return <PicturesErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery pictures={pictures} />
          <Button onClick={this.onLoadMore} page={page} />
        </>
      );
    }
  }
}

PicturesInfo.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func,
};
