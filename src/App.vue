<template>
    <header>
      <HeaderComponent />
      <CategoryCardComponent/>
    </header>

    <footer>
      <FooterComponent />
    </footer>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/footer_partials/FooterComponent.vue';
import CategoryCardComponent from './components/slider_category_partials/CategoryCardComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    CategoryCardComponent
  }
}
</script>

<style lang="scss" scoped>


</style>

