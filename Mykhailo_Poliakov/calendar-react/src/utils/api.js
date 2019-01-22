const api = (url, endpoint) => {
  return {
    get: async () => await (await fetch(`http://${url}/${endpoint}/`)).json(),
    create: async data =>
      await fetch(`http://${url}/${endpoint}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    update: async (data, id) =>
      await fetch(`http://${url}/${endpoint}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    delete: async id =>
      await fetch(`http://${url}/${endpoint}/${id}`, {
        method: 'DELETE'
      })
  };
};

export default api(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_ENDPOINT);
