
import { createRouter, createWebHistory } from "vue-router";
import CartPage from "./pages/CartPage.vue";
import HomePage from "./pages/HomePage.vue";
import AllRestaurant from "./pages/AllRestaurant.vue";
import SingleRestaurant from "./pages/SingleRestaurant.vue";
import ContactPage from "./pages/ContactPage.vue";
import NotFound from "./pages/NotFound.vue";
import PaymentPage from "./pages/PaymentPage.vue";
import CardRestaurantComponent from "./components/CardRestaurantComponent.vue";

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
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },

  ],
});

export default router;
