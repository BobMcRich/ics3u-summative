import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailView from '../views/DetailView.vue';
import CartView from '../views/CartView.vue';
import SettingView from '../views/SettingView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, },
  ],
})
const routes = [
  { path: '/', component: HomeView },
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/movies', component: MoviesView },
  { path: '/movies/:id', component: DetailView },
  { path: '/cart', component: CartView },
  { path: '/setting', component: SettingView }
]



export default router
