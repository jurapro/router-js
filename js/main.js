import Router from "./libs/router.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import LoginForm from "./components/LoginForm.js";


const routes = [
    {path: '/', component: Home, name: 'Главная'},
    {path: '/about', component: About, name: 'О нас'},
    {path: '/login', component: LoginForm, name: 'Вход'},
];

const router = new Router(
    {routes}
);