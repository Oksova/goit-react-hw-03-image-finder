import { Component } from 'react';
import apiService from '../services/apiService';
import ImageGallery from '../ImageGallery/';
import PicturesErrorView from '../PicturesErrorView/PicturesErrorView';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

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
    const PrevPage = prevState.page;
    const NextPage = this.state.page;
    console.log(NextPage);
    console.log(nextRequest);
    console.log('componentDidUpdate PicturesInfo Start');

    if (PrevPage !== NextPage) {
      this.setState({ page: 1 });
      console.log('PrevPage !== NextPage', this.setState);
    }

    if (prevRequest !== nextRequest || PrevPage !== NextPage) {
      this.setState({ status: 'pending' });
      apiService
        .fetchPictures(nextRequest)
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
    console.log('Click onLoadMore after onLoadMore');
  };

  render() {
    const { pictures, error, status, page } = this.state;

    if (status === 'idle') {
      return <div>Введите свой запрос</div>;
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
