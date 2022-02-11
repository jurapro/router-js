import {f,dEvent} from "./helpers.js";

function login(data) {
    return f('login', 'post', null, data);
}

function logout(token) {
    return f('logout', 'get', token, null);
}

export {login, logout};