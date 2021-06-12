class UserInfo {
  constructor(userInfoSelectors) {
    this._profileUserName = document.querySelector(
      userInfoSelectors.profileUserName
    );
    this._profileProfession = document.querySelector(
      userInfoSelectors.profileProfession
    );
  }

  getUserInfo = () => {
    if (this._profileUserName && this._profileProfession) {
      return {
        userName: this._profileUserName.textContent,
        userProfession: this._profileProfession.textContent,
      };
    }
  };

  setUserInfo = (userDataNew) => {
    this._profileUserName.textContent = userDataNew.userName;
    this._profileProfession.textContent = userDataNew.userProfession;
  };
}

export default UserInfo;
