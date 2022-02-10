export default class Home extends HTMLElement {

    connectedCallback() {
        this.innerHTML=`
        <h1>Главная</h1>
        `;
    }
}