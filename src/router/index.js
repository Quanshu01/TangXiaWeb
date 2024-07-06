import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            name: 'Login',
            component: () => import( '@/views/login.vue')
        },
        {
            path: '/home',
            name: 'HomePage1',
            component: () => import( '@/views/HomePage1.vue'),
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/now-status',
                    name: 'now-status',
                    component: () => import('../views/NowStatus.vue')
                },
                {
                    path: '/fault-detect',
                    name: 'fault-detect',
                    component: () => import('../views/FaultDetect.vue')
                },
                {
                    path: '/hotpoint-risk',
                    name: 'hotpoint-risk',
                    component: () => import('../views/HotPointRisk.vue')
                },
                {
                    path: '/ltd-changed',
                    name: 'ltd-changed',
                    component: () => import( '../views/LtdChanged.vue')
                },
                {
                    path: '/pre-control',
                    name: 'pre-control',
                    component: () => import( '../views/PreControl.vue')
                }
            ],
        },
    ]
})
