class UserInfo {
    constructor(userInfoSelectors) {
        this._profileUserName = document.querySelector(
            userInfoSelectors.profileUserName
        );
        this._profileProfession = document.querySelector(
            userInfoSelectors.profileProfession
        );
        this._profileAvatar = document.querySelector(
            userInfoSelectors.profileAvatar
        )
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
        this._profileUserName.textContent = userDataNew.name;
        this._profileProfession.textContent = userDataNew.about;
        this._profileAvatar.src = userDataNew.avatar;
    };
}

export default UserInfo;
