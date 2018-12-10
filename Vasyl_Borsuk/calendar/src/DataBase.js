const fetcher = require("./fetcher");


export default class DataBase {
    constructor(url) {
        this.url = url;
    }

    processSingleResponse(data) {
        data.date = new Date(data.date);
        return data;
    }
    processResponse(data) {
        data.forEach(el => this.processSingleResponse(el));
        return data;
    }
    dateToString(date) {
        return date.toISOString().substring(0, 10);
    }

    async get(url) {
        let resp = await fetcher.get(url);
        return this.processResponse(resp);
    }
    async getAll(id) {
        return await this.get(this.url);
    }
    async getById(id) {
        return await this.get(this.url + "/" + id);
    }
    async getByDate(date) {
        return await this.get(this.url + "?" + "date=" + this.dateToString(date));
    }

    async createFromJson(data) {
        let resp =  await fetcher.post(this.url, data);
        return this.processSingleResponse(resp);
    }
    async create(text, completed, date) {
        return await this.createFromJson({text: text, completed: completed, date: this.dateToString(date)});
    }
}