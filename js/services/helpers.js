const host = 'http://localhost/api-cafe';
const f = async (url, method = 'get', token = null, data = []) => {
    const options = {
        method: method.toUpperCase(),
        headers: {
            "Content-Type": 'application/json'
        },
    }

    if (token)
        options.headers['Authorization'] = `Bearer ${token}`

    if (['post', 'patch'].includes(method))
        options.body = JSON.stringify(data)

    return await fetch(`${host}/${url}`, options).then(res => res.json());
}

const dEvent = (event, detail) => {
    document.dispatchEvent(new CustomEvent(
        event, {
            detail: detail
        }
    ));
}

export {f, dEvent};