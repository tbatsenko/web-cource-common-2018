class HTTPRequestHandler {
    constructor(url) {
        console.log(url);
        this.url = url;
    }


    async get() {
        return (await fetch(this.url)).json()
    }

    async post(data) {
        return (await fetch(this.url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })).json()
    }

    async put(id, data) {
        return (await fetch(this.url + '/' + id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        })).json()
    }

    async delete(id) {
        return (await fetch(this.url + '/' + id, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })).json()

    }
}

export default HTTPRequestHandler;