<template>
  <div class="homepage">
    <div class="hero">
      <video class="hero-video" autoplay loop muted>
        <source src="images/FoodMovie.mp4" type="video/mp4">
      </video>
      <div class="hero-content">
        <h1 class="hero-title">Benvenuti</h1>
        <p class="hero-subtitle">Esplora i migliori ristoranti nella tua zona</p>
      </div>
    </div>

    <section class="categories">
      <h2 class="section-title">Categorie</h2>
      <CategoryCardComponent @categorySelected="onCategorySelected" />
    </section>

    <section class="featured-restaurants">
      <h2 class="section-title">Ristoranti in evidenza</h2>
      <div class="restaurant-list">
        <div v-for="restaurant in filteredRestaurants" :key="restaurant.id" class="restaurant-card">
          <div class="restaurant-image">
            <!-- Aggiungi qui l'immagine del ristorante -->
          </div>
          <div class="restaurant-details">
            <h3 class="restaurant-title">{{ restaurant.company_name }}</h3>
            <p class="restaurant-address">{{ restaurant.address }}</p>
            <p class="restaurant-category">{{ getRestaurantCategories(restaurant) }}</p>
            <button class="show-products-btn" @click="redirectToRestaurant(restaurant.slug)">Mostra Prodotti</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCardComponent from '../components/slider_category_partials/CategoryCardComponent.vue';
import axios from 'axios';

export default {
  components: {
    CategoryCardComponent,
  },
  data() {
    return {
      restaurants: [],
      selectedCategoryId: null,
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
    },
    redirectToRestaurant(slug) {
      // Aggiungi qui il codice per reindirizzare all'URL del ristorante selezionato
    },
    getRestaurantCategories(restaurant) {
      return restaurant.typologies.map(typology => typology.name).join(', ');
    },
  },
  computed: {
    filteredRestaurants() {
      let filtered = [];
      if (!this.selectedCategoryId) {
        filtered = this.restaurants;
      } else {
        filtered = this.restaurants.filter(restaurant => {
          return restaurant.typologies.some(typology => typology.id === this.selectedCategoryId);
        });
      }
      return filtered.slice(0, 6); // Limita l'array a 6 elementi
    },
  },
  created() {
    this.fetchRestaurants();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=Rubik&display=swap');

.hero {
  position: relative;
  color: #ffffff;
  text-align: center;
}

.hero-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-video {
  width: 100%;
  /* Set the video width to 100% of its container */
  height: auto;
  /* Allow the video to adjust its height automatically */
  min-height: 100%;
  object-fit: cover;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #f36d00;
}

.hero-subtitle {
  font-size: 18px;
  margin-bottom: 30px;
  color: #f36d00;
}

.homepage {
  font-family: 'Rubik', sans-serif;
  font-family: 'Cabin', sans-serif;
  background-color: #f5f5f5;
  padding: 20px;
  padding-top: 0px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.featured-restaurants {
  margin-top: 40px;
}

.restaurant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.restaurant-card {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.restaurant-details {
  margin-top: 15px;
}

.restaurant-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}

.restaurant-address {
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
}

.restaurant-category {
  font-size: 14px;
  color: #999999;
  margin-bottom: 8px;
}

.show-products-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 700;
  background-color: #ff4081;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.show-products-btn:hover {
  background-color: #ff005a;
}

@media only screen and (max-width: 767px) {
  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 14px;
  }
}
</style>

