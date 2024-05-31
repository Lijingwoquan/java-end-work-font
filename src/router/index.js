import {
    createRouter,
    createWebHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Admin from '~/pages/admin.vue'
import NotFound from "~/pages/404.vue"

const routes = [
    {
        path: "/",
        component: Index,
        meta: {
            title: "购物页面"
        }
    },
    {
        path: "/admin",
        component: Admin,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
