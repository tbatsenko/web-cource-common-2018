export const get = (url)=> {
    return fetch(url)
        .then(resp => resp.json())
};

export const post = (url, data) => {
    return fetch(url, {
        headers: {"content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data),
        method: "POST"
    })
        .then(resp => resp.json())
};