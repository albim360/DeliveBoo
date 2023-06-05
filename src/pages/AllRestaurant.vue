<template>
  <div class="restaurant-list">
    <h2 class="section-title">Ristoranti della categoria selezionata</h2>
    <div v-for="restaurant in restaurants" :key="restaurant.id" class="card">
      <div class="card-content">
        <div class="restaurant-info">
          <div class="restaurant-details">
            <h3 class="restaurant-name">{{ restaurant.company_name }}</h3>
            <p class="restaurant-address">{{ restaurant.address }}</p>
            <button class="show-products-btn" @click="redirectToRestaurant(restaurant.slug)">Mostra Prodotti</button>
          </div>
        </div>
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
      products: [],
      selectedTypology: '',
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
        this.selectedTypology = response.data.selectedTypology;
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    redirectToRestaurant(slug) {
      axios.get(`http://127.0.0.1:8000/api/restaurants/${slug}`)
        .then(response => {
          this.products = response.data.products;
          console.log(this.products);
          this.$router.push({ name: 'single-restaurant', params: { slug } });
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.restaurant-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
}

.card-content {
  margin-top: 5px;
}

.restaurant-info {
  display: flex;
  align-items: center;
}

.restaurant-image {
  width: 100px;
  height: 100px;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 10px;
  /* Aggiungi qui ulteriori stili per l'immagine del ristorante */
}

.restaurant-details {
  flex: 1;
}

.restaurant-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.restaurant-address {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.show-products-btn {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
}

.show-products-btn:hover {
  background-color: #45a049;
}
</style>
