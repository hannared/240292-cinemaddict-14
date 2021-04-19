import { times } from 'lodash';
import { renderElement } from '../utils';
import UserProfile from '../view/user-profile';

export default class Header {
  constructor(headerContainer) {
    this._headerContainer = headerContainer;
  }

  init(homeFilms) {
    this._homeFilms = homeFilms.slice();
  }

  _renderUserProfile() {
    const films = this._homeFilms;
    this._userProfileComponent = new UserProfile(films);

    renderElement(this._headerContainer, this._userProfileComponent);
  }
  _renderHeader() {
    this._renderUserProfile();
  }

  render() {
    this._renderHeader();
  }
}
