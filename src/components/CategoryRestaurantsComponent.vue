<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/restaurants">All Restaurants</router-link>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/api/typologies');
      if (response.data.results) {
        this.categories = response.data.results;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
