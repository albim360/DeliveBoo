<template>
  <div id="app">
    <header>
      <NavBarComponent />
      <AdvancedSearch />
    </header>
    <main>
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

<style lang="scss" scoped></style>
