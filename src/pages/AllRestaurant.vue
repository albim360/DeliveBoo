<template>
  <div>
    <h2>Ristoranti</h2>
    <div v-for="restaurant in restaurants" :key="restaurant.id" class="card">
      <div class="card-content">
        <div>
          <strong>{{ restaurant.company_name }}</strong>
        </div>
        <div>
          {{ restaurant.address }}
        </div>
        <button @click="redirectToRestaurant(restaurant.slug)">Mostra Prodotti</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  props: {
    selectedCategoryId: {
      type: Number,
      default: null,
    },
  },
  async mounted() {
    try {
      const response = await axios.get(`http://localhost:8000/api/typologies/${this.selectedCategoryId}`);
      if (response.data.results) {
        this.restaurants = response.data.results;
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    redirectToRestaurant(slug) {
      this.$router.push({ name: 'single-restaurant', params: { slug } });
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
}

.card-content {
  margin-top: 5px;
}
</style>

