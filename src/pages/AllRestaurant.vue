<template>
    <div>
      <h2>All Restaurants</h2>
      <div v-for="restaurant in filteredRestaurants" :key="restaurant.id">
        {{ restaurant.company_name }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      restaurants: {
        type: Array,
        default: () => [],
      },
      selectedCategoryId: {
        type: Number,
        default: null,
      },
    },
    computed: {
      filteredRestaurants() {
        if (!this.selectedCategoryId) {
          return this.restaurants;
        } else {
          return this.restaurants.filter((restaurant) => {
            return restaurant.typologies.some((typology) => typology.id === this.selectedCategoryId);
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  