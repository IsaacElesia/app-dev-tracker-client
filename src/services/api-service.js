import config from '../config';
import TokenService from './token-service';

const ApiService = {
	login(content = {}) {
		return fetch(`${config.API_ENDPOINT}/auth`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(content),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	getItems(endpoint) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}`, {
			headers: {
				'x-auth-token': TokenService.getAuthToken(),
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	getItem(endpoint, id) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}/${id}`, {
			headers: {
				'x-auth-token': TokenService.getAuthToken(),
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	getArticleComments(endpoint, id) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}/${id}/comments`, {
			headers: {
				Authorization: `Basic ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	postItemWithAuth(endpoint, content = {}) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-auth-token': TokenService.getAuthToken(),
			},
			body: JSON.stringify(content),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	postItem(endpoint, content = {}) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(content),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},

	updateItem(endpoint, content = {}) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				'x-auth-token': TokenService.getAuthToken(),
			},
			body: JSON.stringify(content),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res
		);
	},

	deleteItem(endpoint) {
		return fetch(`${config.API_ENDPOINT}/${endpoint}`, {
			method: 'DELETE',
			headers: {
				'x-auth-token': TokenService.getAuthToken(),
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res
		);
	},
};

export default ApiService;
