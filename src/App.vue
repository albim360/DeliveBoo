<template>
  <div id="app" class="app-container">
    <header>
      <NavBarComponent />
      <router-link to="/advanced-search" class="find-restaurant-link">Trova il ristorante che fa per te!</router-link>
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
import AllProduct from './pages/AllProduct.vue';

export default {
  components: {
    FooterComponent,
    NavBarComponent,
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

.find-restaurant-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
  margin-top: 5px;
}

.find-restaurant-link:hover {
  background-color: #0056b3;
}

.find-restaurant-link:focus,
.find-restaurant-link:active {
  outline: none;
  background-color: #0056b3;
}

</style>
