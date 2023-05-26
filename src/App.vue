<template>
  <header>
    <HeaderComponent />
  </header>

  <footer>
    <FooterComponent />
  </footer>

 
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/footer_partials/FooterComponent.vue';

export default {
  components: { HeaderComponent, FooterComponent }, 

  

}
</script>

<style lang="scss" scoped></style>
