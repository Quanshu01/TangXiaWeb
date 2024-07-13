import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/now-status' 
        },
        {
            path: '/',
            name: 'HomePage1',
            component: () => import('@/views/HomePage1.vue'),
            children: [
                {
                    path: 'now-status',
                    name: 'now-status',
                    component: () => import('../views/NowStatus.vue')
                },
                {
                    path: 'hotpoint-risk',
                    name: 'hotpoint-risk',
                    component: () => import('../views/HotPointRisk.vue')
                },
                {
                    path: 'ltd-changed',
                    name: 'ltd-changed',
                    component: () => import('../views/LtdChanged.vue')
                },
                {
                    path: '',
                    redirect: 'now-status'
                }
            ],
        },
    ]
})
