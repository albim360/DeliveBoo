<template>
  <div class="homepage">
    <!-- <h2>Homepage</h2> -->
    <CategoryCardComponent @categorySelected="onCategorySelected" />

  </div>
</template>
  
<script>
import CategoryCardComponent from '../components/slider_category_partials/CategoryCardComponent.vue';
import AllRestaurant from './AllRestaurant.vue';
import axios from 'axios';

export default {
  components: {
    CategoryCardComponent,
    AllRestaurant,

  },
  data() {
    return {
      restaurants: [],
      selectedCategoryId: null
    };
  },
  methods: {
    async fetchRestaurants() {
      try {
        const response = await axios.get('http://localhost:8000/api/restaurants');
        if (response.data.results) {
          this.restaurants = response.data.results;
        }
      } catch (error) {
        console.error(error);
      }
    },
    onCategorySelected(categoryId) {
      this.selectedCategoryId = categoryId;
    }
  },
  computed: {
    filteredRestaurants() {
      if (!this.selectedCategoryId) {
        return this.restaurants;
      } else {
        return this.restaurants.filter(restaurant => {
          return restaurant.typologies.some(typology => typology.id === this.selectedCategoryId);
        });
      }
    }
  },
  created() {
    this.fetchRestaurants();
  }
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=Rubik&display=swap');

.homepage {
  font-family: 'Rubik', sans-serif;
  font-family: 'Cabin', sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
}
</style>