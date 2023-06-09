import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import AllRestaurant from "./pages/AllRestaurant.vue";
import SingleRestaurant from "./pages/SingleRestaurant.vue";
import ContactPage from "./pages/ContactPage.vue";
import NotFound from "./pages/NotFound.vue";
import PaymentPage from "./pages/PaymentPage.vue";
import CardRestaurantComponent from "./components/CardRestaurantComponent.vue";
import AdvancedSearch from "./pages/AdvancedSearch.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: AllRestaurant,
    },
    {
      path: '/restaurants/:slug',
      name: 'single-restaurant',
      component: SingleRestaurant,
      props: true,
    },

    {
      path: '/contacts',
      name: 'contactus',
      component: ContactPage,
    },
    {
      path: "/payment",
      name: "payment",
      component: PaymentPage,
    },
    {
      path: '/category-restaurants/:categoryId',
      name: 'category-restaurants',
      component: AllRestaurant,
      props: route => ({ selectedCategoryId: parseInt(route.params.categoryId) })
    },
    {
      path: '/restaurant/:slug',
      name: 'restaurant',
      component: CardRestaurantComponent,
      props: true,
    },
    {
      path: "/advanced-search",
      name: "advanced-search",
      component: AdvancedSearch,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },

  ],
});

export default router;
