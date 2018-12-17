class RequestHandler{
    constructor(url){
        this.url = url;
    }
    getAll = () => {
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
            request.open("GET", this.url, true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send();
        });
    }
    get = (id) => {
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
            request.open("GET", this.url + "/" + id.toString(), true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send();
        });
    }
    post = (data) => {
        data = (data instanceof String) ? data : JSON.stringify(data);
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
    put = (id, data) => {
        data = (data instanceof String) ? data : JSON.stringify(data);
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
            request.open("PUT", this.url + "/" + id.toString(), true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send(data);
        })
    }
    delete = (id) => {
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
            request.open("DELETE", this.url + "/" + id.toString(), true);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.send();
        });
    }
}
module.exports = RequestHandler;