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
        this.requestHandler.put(id, data).then((data)=>{
            callback(JSON.parse(data));
        })
    } 
    deleteTodo = (id, callback) => {
        this.requestHandler.delete(id).then((data)=>{
            callback(JSON.parse(data));
        })
    } 
    addTodo = (data, callback) => {
        this.requestHandler.post(data).then((data)=>{
            callback(JSON.parse(data));
        })
    } 
}
module.exports = Database;