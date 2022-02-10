export default class About extends HTMLElement {

    connectedCallback() {
        this.innerHTML=`
        <h1>О нас</h1>
        `;
    }
}