export default class UserInfo {
    constructor(profile, profileTitle, profileDescription, profileAvatar) {
        this._profileTitle = profileTitle;
        this.profileDescription = profileDescription;
        this.profileAvatar = profileAvatar
        this._id = profile._id;
        this._name = profile.name;
        this._about = profile.about;
        this._avatar = profile.avatar
    }

    setUserInfo() {
        this._profileTitle.textContent = this._name;
        this.profileDescription.textContent = this._about;
        this.profileAvatar.src = this._avatar;
    }

    getUserInfo() {
        return this._profileTitle.textContent, this.profileDescription.textContent;
    }

    getUserId() {
        return this._id
    }
}