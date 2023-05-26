<template>
  <div>
    <header>
      <HeaderComponent />
    </header>
    <main>
      <AllRestaurant />
    </main>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import AllRestaurant from './pages/AllRestaurant.vue';

export default {
  components: {
    HeaderComponent,
    AllRestaurant
  }
};
</script>

<style scoped>
/* Stili CSS specifici per questo componente */
</style>

