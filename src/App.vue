<template>
  <div>
    <header>
      <NavBarComponent />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <FooterComponent />
    </footer>
  </div>
</template>

<script>
import FooterComponent from './components/footer_partials/FooterComponent.vue';
import NavBarComponent from './components/header_partials/NavBarComponent.vue';

export default {
  components: {
    FooterComponent,
    NavBarComponent
  }
}
</script>

<style lang="scss" scoped></style>
