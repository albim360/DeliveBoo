<template>
    <div>
      <h2>Homepage</h2>
      <CategoryCardComponent @categorySelected="onCategorySelected" />
      <AllRestaurant :restaurants="filteredRestaurants" :selectedCategoryId="selectedCategoryId" />
    </div>
  </template>
  
  <script>
  import CategoryCardComponent from '../components/slider_category_partials/CategoryCardComponent.vue';
  import AllRestaurant from './AllRestaurant.vue';
  import axios from 'axios';
  
  export default {
    components: {
      CategoryCardComponent,
      AllRestaurant
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
  