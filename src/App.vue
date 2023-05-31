<template>
  <div id="app" class="app-container">
    <header>
      <NavBarComponent />
      <!-- <AdvancedSearch /> da aggiustare -->
    </header>
    <main class="app-content ">
      <router-view />
      <AllProducts />
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<script>
import FooterComponent from './components/footer_partials/FooterComponent.vue';
import NavBarComponent from './components/header_partials/NavBarComponent.vue';
import AdvancedSearch from './pages/AdvancedSearch.vue';
import AllProduct from './pages/AllProduct.vue';

export default {
  components: {
    FooterComponent,
    NavBarComponent,
    AdvancedSearch,
    AllProduct
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.app-content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
