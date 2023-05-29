<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/restaurants">All Restaurants</router-link>
    <div v-for="restaurant in restaurants" :key="restaurant.id">
      <h3>{{ restaurant.company_name }}</h3>
      <p>{{ restaurant.description }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: []
    };
  },
  async created() {
    try {
      const categoryId = parseInt(this.$route.params.categoryId);
      const response = await axios.get(`http://localhost:8000/api/typologies/${categoryId}`);
      if (response.data.success) {
        this.restaurants = response.data.results;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
