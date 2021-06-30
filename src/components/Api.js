import {authToken, baseUrl} from "../utils/constants";

class Api {
    constructor(options) {
        this.options = options;
    }

    getInitialCards() {
        return fetch(`${baseUrl}/v1/cohort-42/cards`, {
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
        return fetch(`${baseUrl}/v1/cohortId/users/me`, {
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

    editUserInfo() {
        return fetch(`${baseUrl}/v1/cohortId/users/me`, {
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