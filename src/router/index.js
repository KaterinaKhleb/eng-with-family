import Vue from 'vue'
import VueRouter from 'vue-router'
import Enter from "../components/Enter"
import Navigation from "../components/Navigation"

import User from "../components/User"
import Task1 from "../components/Task1"
import Task2 from "../components/Task2"
import Task3 from "../components/Task3"




Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Enter",
        component: Enter
    },
    {
        path: "/user",
        name: "User",
        component: User
    },
    {
        path: "/enter",
        name: "Enter",
        component: Enter
    },
    {
        path: '/navigation',
        name: 'Navigation',
        component: Navigation
    },
    {
        path: '/task1',
        name: 'Task1',
        component: Task1,
    },
    {
        path: '/task2',
        name: 'Task2',
        component: Task2
    },
    {
        path: '/task3',
        name: 'Task3',
        component: Task3
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router