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

            document.querySelector(this.view).dispatchEvent(new CustomEvent(
                'router-view', {
                    detail: route.component
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
            const elementName = 'template-' + e.detail.name.toLocaleLowerCase();
            this.append(document.createElement(elementName));

            if (!customElements.get(elementName)) customElements.define(elementName, e.detail);
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