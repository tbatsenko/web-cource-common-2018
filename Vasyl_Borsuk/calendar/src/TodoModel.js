const fetcher = require('./fetcher')

export default class TodoModel {
    constructor(url) {
        this.url = url
    }

    normalizeSingle(data) {
        data.date = new Date(data.date)
        return data
    }
    normalize(data) {
        data.forEach(el => this.normalizeSingle(el))
        return data
    }
    dateToString(date) {
        return date.toISOString().substring(0, 10)
    }

    async get(url) {
        let resp = await fetcher.get(url)
        return this.normalize(resp)
    }
    async getAll(id) {
        return await this.get(this.url)
    }
    async getById(id) {
        return await this.get(this.url + '/' + id)
    }
    async getByDate(date) {
        return await this.get(
            this.url + '?' + 'date=' + this.dateToString(date)
        )
    }

    async createFromJson(data) {
        let resp = await fetcher.post(this.url, data)
        return this.normalizeSingle(resp)
    }
    async create(text, completed, date) {
        return await this.createFromJson({
            text: text,
            completed: completed,
            date: this.dateToString(date),
        })
    }

    async update(data) {
        let resp = await fetcher.put(this.url + '/' + data.id, {
            text: data.text,
            completed: data.completed,
            date: this.dateToString(data.date),
        })
        return this.normalizeSingle(resp)
    }

    async delete(data) {
        let resp = await fetcher.del(this.url + '/' + data.id)
        return this.normalizeSingle(resp)
    }
}
