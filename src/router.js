import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import AboutUs from './pages/AboutUs.vue'
import RestaurantShow from './pages/Restaurants.show.vue'
import RestaurantIndex from './pages/Restaurants.index.vue'


const history = createWebHistory()
console.log('history: ', history)

const router = createRouter({
    history,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about-us',
            name: 'about',
            component: AboutUs,
        },

        {
            path: '/blog',
            name: 'restaurant.index',
            component: RestaurantsIndex,
        },
        {
            path: '/blog/:slug',
            name: 'restaurant.show',
            component: RestaurantsShow,
            props: true,
        },

    ],
})

export { router }