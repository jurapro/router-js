export default class Router {

    constructor(settings) {
        this.routes = settings.routes;
        this.link = settings.link || 'router-link'
        this.view = settings.view || 'router-view'

        customElements.define(this.link, RouterLink);
        customElements.define(this.view, RouterView);
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('router-click', (e) => {
            const route = this.routes.find(route => route.path === e.detail);
            if (!route) return;

            if (!route.element) {
                const elementName = 'template-' + route.component.name.toLocaleLowerCase();
                if (!customElements.get(elementName)) customElements.define(elementName, route.component);
                route.element = document.createElement(elementName);
            }
            document.querySelector(this.view).dispatchEvent(new CustomEvent(
                'router-view', {
                    detail: route.element
                }
            ));
        });
    }
}

class RouterView extends HTMLElement {
    connectedCallback() {
        this.bindEvents();
    }

    bindEvents() {
        this.addEventListener('router-view', (e) => {
            this.innerHTML = '';
            this.append(e.detail);
        });
    }
}

class RouterLink extends HTMLElement {

    constructor() {
        super();
        this.bindEvents();
    }

    bindEvents() {
        this.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent(
                'router-click', {
                    detail: this.getAttribute('to')
                }
            ));
        });
    }
}