export default class Router {

    constructor(routes) {
        this.routes = routes;
        customElements.define('router-link', RouterLink);
        customElements.define('router-view', RouterView);
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('router-click', (e) => {
            const component = this.routes.find(route => route.path === e.detail);
            if (!component) return;
            customElements.define('router-view', component.component);
        });
    }
}

class RouterView extends HTMLElement {

}

class RouterLink extends HTMLElement {

    constructor() {
        super();
        this.bindEvents();
    }

    bindEvents() {
        this.addEventListener('click', (e) => {
            document.dispatchEvent(new CustomEvent(
                'router-click', {
                    detail: this.getAttribute('to')
                }
            ));
        });
    }
}