import{
  profileTitle,
  profileDescription,
  profileAvatar,
} from '../utils/constants.js';

export default class UserInfo {
  constructor(profile) {
    this._id = profile._id;
    this._name = profile.name;
    this._about = profile.about;
    this._avatar = profile.avatar
  }

  setUserInfo() {
    profileTitle.textContent = this._name;
    profileDescription.textContent = this._about;
    profileAvatar.src = this._avatar;
  }

  getUserId() {
    return this._id
  }
}
