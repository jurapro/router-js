import Router from "./libs/router.js";
import Home from "./components/Home.js";
import About from "./components/About.js";


const routes = [
    {path: '/', component: Home, name: 'Главная'},
    {path: '/about', component: About, name: 'О нас'},
];

const router = new Router(
    {routes}
);