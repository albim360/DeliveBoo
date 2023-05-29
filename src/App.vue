<template>
    <header>
      <NavBarComponent />
    </header>
    <main>
      <router-view />
      <AllProducts />
    </main>
    <footer>
      <FooterComponent />
    </footer>
</template>

<script>
import FooterComponent from './components/footer_partials/FooterComponent.vue';
import NavBarComponent from './components/header_partials/NavBarComponent.vue';
import AllProduct from './pages/AllProduct.vue';

export default {
  components: {
    FooterComponent,
    NavBarComponent,
    AllProduct
}
}
</script>

<style lang="scss" scoped></style>
