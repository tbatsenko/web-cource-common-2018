const Adapter = {
    baseUrl: "http://localhost:3005",
    toJson: function (data) {
        // eslint-disable-next-line
        return data.then((res) => res.json());
    },
    getAll: function () {
        return this.toJson(fetch(this.baseUrl));
    },
    getById: function (list, id) {
        return this.toJson(fetch(`${this.baseUrl}/${list}/${id}`));
    },
    removeById: function (list, id) {
        let options = { method: 'DELETE' };
        return this.toJson(fetch(`${this.baseUrl}/${list}/${id}`, options));
    },
    add: function (list, data) {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        return this.toJson(fetch(`${this.baseUrl}/${list}`, options));
    },
    update: function (list, id, data) {
        let options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        return this.toJson(fetch(`${this.baseUrl}/${list}/${id}`, options));
    },
    getTasks: function (list) {
        return this.toJson(fetch(`${this.baseUrl}/${list}`));
    },
};

module.exports = Adapter;