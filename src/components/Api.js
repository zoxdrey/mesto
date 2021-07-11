import {baseUrl, groupId} from "../utils/constants";

class Api {
    constructor(options) {
        this._options = options;
    }

    getInitialCards() {
        return fetch(`${baseUrl}/v1/${groupId}/cards`, this._options).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getUserInfo() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, this._options).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setUserInfo(userName, userAbout) {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            method: 'PATCH',
            ...this._options,
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setUserAvatar(avatarLink) {
        return fetch(`${baseUrl}/v1/${groupId}/users/me/avatar`, {
            method: 'PATCH',
            ...this._options,
            body: JSON.stringify({
                avatar: avatarLink
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    createCard(cardName, cardLink) {
        return fetch(`${baseUrl}/v1/${groupId}/cards`, {
            method: 'POST',
            ...this._options,
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(cardId) {
        return fetch(`${baseUrl}/v1/${groupId}/cards/${cardId}`, {
            method: 'DELETE',
            ...this._options,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addLike(cardId) {
        return fetch(`${baseUrl}/v1/${groupId}/cards/likes/${cardId}`, {
            method: 'PUT',
            ...this._options,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    removeLike(cardId) {
        return fetch(`${baseUrl}/v1/${groupId}/cards/likes/${cardId}`, {
            method: 'DELETE',
            ...this._options,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getAllData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }
}

export default Api;