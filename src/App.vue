<template>
  <header>
    <HeaderComponent />
  </header>
  <main>
    <AllRestaurant />
  </main>
  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/footer_partials/FooterComponent.vue';
import AllRestaurant from './pages/AllRestaurant.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    AllRestaurant
  }
};
</script>

<style scoped>
/* Stili CSS specifici per questo componente */
</style>


