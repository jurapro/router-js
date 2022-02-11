import {login, logout} from "../services/api.js";
import {dEvent} from "../services/helpers.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.user = null;
        this.data = {
            login: '',
            password: ''
        }
        this.renderer = false;
    }

    connectedCallback() {
        if (!this.renderer) {
            this.render(this.getTemplateLogin());
        }
    }

    render(template) {
        this.renderer = true;
        this.innerHTML = template;
        this.attachModel();
        this.bindEvents();
    }

    getTemplateLogin() {
        return `
            <h3>Вход</h3>
            <div class="message"></div>
            <label>Логин: <input type="login" data-model="login"></label>            
            <label>Пароль: <input type="password" data-model="password"></label>
            <button data-click="login">Вход</button>          
            `;
    }

    getTemplateOut() {
        return `
            <h3>Вы вошли как ${this.user.login}</h3>
            <button data-click="out">Выход</button>          
            `;
    }

    attachModel() {
        this.querySelectorAll('input')
            .forEach(el => el.addEventListener('input', e => this.inputText(e)));
        this.querySelector('button')
            .addEventListener('click', e => this.clickButton(e));
    }

    inputText(e) {
        if (this.data[e.target.dataset.model] !== undefined) {
            this.data[e.target.dataset.model] = e.target.value;
        }
    }

    clickButton(e) {
        this[e.target.dataset.click]();
    }

    bindEvents() {
        document.addEventListener('user-login', (e) => {
            this.user = e.detail;
            this.render(this.getTemplateOut());
        });

        document.addEventListener('user-out', () => {
            this.user = null;
            this.render(this.getTemplateLogin());
        });
    }

    login() {
        if (!this.data.login || !this.data.password) return;
        this.style.display = 'none';
        login(this.data)
            .then(res => {
                this.style.display = '';
                if (res.error) {
                    this.querySelector('.message').innerHTML = 'Не правильный логин или пароль';
                    return;
                }
                dEvent('user-login', {login: this.data.login, user_token: res.data.user_token});
            });
    }

    out() {
        if (!this.user.user_token) return;
        this.style.display = 'none';
        logout('logout', 'get', this.user.user_token, null)
            .then(res => {
                this.style.display = '';
                dEvent('user-out');
            });
    }

}