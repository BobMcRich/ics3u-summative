import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailView from '../views/DetailView.vue';
import CartView from '../views/CartView.vue';
import SettingView from '../views/SettingView.vue';
import ErrorView from '@/views/ErrorView.vue';
import { useStore } from '../store';

const routes = [
    { path: '/', meta: { auth: false }, component: HomeView },
    { path: '/register', meta: { auth: false }, component: RegisterView },
    { path: '/login', meta: { auth: false }, component: LoginView },
    { path: '/movies', meta: { auth: true }, component: MoviesView },
    { path: '/movies/:id', meta: { auth: false }, component: DetailView },
    { path: '/cart', meta: { auth: true }, component: CartView }, // Require authentication
    { path: '/setting', meta: { auth: true }, component: SettingView }, // Require authentication
    { path: '/:pathMatch(.*)*', meta: { auth: false }, component: ErrorView },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const store = useStore();

    // Check if the route requires authentication
    if (to.meta.auth && !store.user) {
        // If not logged in, redirect to the login page
        next('/login');
    } else {
        // Allow access to the route
        next();
    }
});

export default router;
