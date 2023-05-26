<template>
  <header>
    <NavBarComponent />
    <HeaderComponent />
    <CategoryCardComponent />
  </header>
  <main>
    <AllRestaurant />
    <AllProduct />
  </main>
  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

import FooterComponent from './components/footer_partials//FooterComponent.vue';
import AllRestaurant from './pages/AllRestaurant.vue';
import AllProduct from './pages/AllProduct.vue';
import CategoryCardComponent from './components/slider_category_partials/CategoryCardComponent.vue';
import NavBarComponent from './components/header_partials/NavBarComponent.vue';


export default {
  components: {
    HeaderComponent,
    FooterComponent,
    CategoryCardComponent,
    NavBarComponent,
    // AllRestaurant,
    // AllProduct FUNZIONANTI DA UTILIZZARE
  }
}
</script>

<style lang="scss" scoped></style>

