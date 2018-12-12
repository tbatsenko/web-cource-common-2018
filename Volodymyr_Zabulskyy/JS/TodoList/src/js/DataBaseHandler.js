import HTTPRequestHandler from './HTTPRequestHandler'

class DataBaseHandler {
    constructor(url) {
        this.url = url;
        this.reqHandler = new HTTPRequestHandler(url);
    }

    validate(data){
        if (data instanceof String){
            data = JSON.parse(data);
        }
        if (data.done === undefined){
            data.done = false;
        }
        if (data.text === undefined){
            console.error(`invalid data ${data}: text is not present`)
        }
        return JSON.stringify(data);
    }

    getAllTodos(callback){
        return this.reqHandler.get()
            .then(data => {
                if (callback !== undefined)
                    callback(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    getTodoById(id, callback){
        return this.reqHandler.getById(id)
            .then(data => {
                if (callback !== undefined)
                    callback(data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    removeTodoById(id, callback){
        return this.reqHandler.delete(id)
            .then(data => {
                if (callback !== undefined)
                    callback(data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    replaceTodoById(id, jsonData, callback){
        jsonData = this.validate(jsonData);
        return this.reqHandler.put(id, jsonData)
            .then(data => {
                if (callback !== undefined)
                    callback(data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    addTodo(jsonData, callback){
        jsonData = this.validate(jsonData);
        return this.reqHandler.post(jsonData)
            .then(data => {
                if (callback !== undefined)
                    callback(data);
            })
            .catch(err => {
                console.error(err);
            });
    }
}


export default DataBaseHandler;
