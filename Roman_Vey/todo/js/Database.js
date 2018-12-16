import RequestHandler from './RequestHandler';
class Database{
    constructor(url){
        this.requestHandler = new RequestHandler(url);
    }
    getTodos = (callback) => {
        this.requestHandler.getAll().then((data)=> {
            callback(JSON.parse(data));
        })
    }
    getTodo = (id, callback) => {
        this.requestHandler.get(id).then((data)=> {
            callback(JSON.parse(data));
        })
    }
    updateTodo = (id, data, callback) => {
        this.requestHandler.put(id, data).then((data) => {
            callback(JSON.parse(data));
        })
    } 
    deleteTodo = (id, callback) => {
        this.requestHandler.delete(id).then((data) => {
            callback(JSON.parse(data));
        })
    } 
    addTodo = (data, callback) => {
        this.requestHandler.post(data).then((data) => {
            callback(JSON.parse(data));
        })
    }
    getTodosForSelectedDay = (day, callback) => {
        this.getTodos((data) => {
            data = this.filter(data, day);
            callback(data);
        });
    }
    filter = (data, day) => {
        return data.filter((todo) => {
            let todoDate = this.toDate(todo.time);
            return (todoDate.getDate() == day.getDate() &&
            todoDate.getMonth() == day.getMonth() &&
            todoDate.getFullYear() == day.getFullYear());
        })
    }
    toDate = (timestamp) => {
        timestamp = timestamp instanceof String ? parseInt(timestamp, 10): timestamp;
        return new Date(timestamp * 1000);
    }
}
module.exports = Database;