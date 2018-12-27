import {XMLHttpRequest} from 'xmlhttprequest'

class HTTPRequestHandler {
    constructor(url) {
        this.url = url;
    }


    get() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onload = () => {
                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.responseText)
                }
            };
            request.onerror = reject;
            request.open("GET", this.url, true); // true for asynchronous
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(null);
        })
    }

    getById(id){
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            id = id.toString();
            request.onload = () => {
                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.responseText)
                }
            };
            request.onerror = reject;
            request.open("GET", this.url + '/' + id, true); // true for asynchronous
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(null);
        })
    }

    post(data) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onload = () => {
                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.responseText);
                }
            };
            request.onerror = reject;
            request.open("POST", this.url, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(data);
        })
    }

    put(id, data) {
        return new Promise((resolve, reject) => {
            id = id.toString();
            let request = new XMLHttpRequest();
            request.onload = () => {
                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.responseText)
                }
            };
            request.onerror = reject;
            request.open("PUT", this.url + '/' + id, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(data);
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            id = id.toString();
            let request = new XMLHttpRequest();
            request.onload = () => {
                if (request.readyState === 4 && request.status < 300 && request.status >= 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.responseText)
                }
            };
            request.onerror = reject;
            request.open("DELETE", this.url + '/' + id, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send();
        })

    }
}

export default HTTPRequestHandler;