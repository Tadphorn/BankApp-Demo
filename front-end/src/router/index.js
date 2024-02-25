import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/LoginForm.vue')
    },
    {
        path: '/deposit',
        name: 'deposit',
        component: () => import('../view/Deposit.vue')
    },
    {
        path: '/withdraw',
        name: 'withdraw',
        component: () => import('../view/Withdraw.vue')
    },
    {
        path: '/transfer',
        name: 'transfer',
        component: () => import('../view/Transfer.vue')
    },
    {
        path: '/history',
        name: 'history',
        component: () => import('../view/History.vue')
    },


];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;