import {authToken, baseUrl, groupId} from "../utils/constants";

class Api {
    constructor(options) {
        this.options = options;
    }

    getInitialCards() {
        return fetch(`${baseUrl}/v1/${groupId}/cards`, {
            headers: {
                authorization: authToken
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getUserInfo() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            headers: {
                authorization: authToken
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    setUserInfo(userName, userAbout) {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: authToken,
                'Content-Type': 'application/json'
            },
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

    setUserAvatar() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            headers: {
                authorization: authToken
            }
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
            headers: {
                authorization: authToken,
                'Content-Type': 'application/json'
            },
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

    deleteCard() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            headers: {
                authorization: authToken
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addLike() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            headers: {
                authorization: authToken
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    removeLike() {
        return fetch(`${baseUrl}/v1/${groupId}/users/me`, {
            headers: {
                authorization: authToken
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}

export default Api;