export const getRequest = hostName => endPointName => data =>
  Object.keys(data).includes('id')
    ? [hostName, endPointName, data.id].join('/')
    : [hostName, endPointName].join('/') +
      '?' +
      Object.keys(data)
        .map(key => key + '=' + data[key])
        .join('&')

export const postRequest = hostName => endPointName => () =>
  [hostName, endPointName].join('/')

export const deleteRequest = hostName => endPointName => id =>
  [hostName, endPointName, id].join('/')

export default hostName => endPointName => {
  return {
    get: getRequest(hostName)(endPointName),
    post: postRequest(hostName)(endPointName),
    delete: deleteRequest(hostName)(endPointName),
  }
}
