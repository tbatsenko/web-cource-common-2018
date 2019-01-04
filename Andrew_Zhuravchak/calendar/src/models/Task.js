import config from '../dbconfig'

class Task {
  static baseURL = config['url'] + ':' + config['port'] + '/tasks/'

  static getAll = async () => {
    const response = await fetch(Task.baseURL)
    let tasks = await response.json()

    tasks.map(task => {
      task.date = new Date(task.date)
      return task
    })

    return tasks
  }

  static getById = async (taskId) => {
    const response = await fetch(Task.baseURL + taskId)

    return await response.json()
  }

  static create = async (task) => {
    const response = await fetch(Task.baseURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    return await response.json()
  }

  static delete = async (taskId) => {
    const response = await fetch(Task.baseURL + taskId, {
      method: 'DELETE'
    })

    return await response.json()
  }

  static edit = async (task) => {
    const response = await fetch(Task.baseURL + task.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    return await response.json()
  }
}

export default Task