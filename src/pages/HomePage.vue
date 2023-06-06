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
      <CategoryCardComponent @categorySelected="onCategorySelected" />
    </section>

    <section class="bg-btn-search">
      <button class="advanced-search-btn" @click="redirectToAdvancedSearch">
      Non hai ancora scelto? Scopri la nostra ricerca avanzata!
    </button>
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
            <button class="show-products-btn" @click="redirectToRestaurant(restaurant.slug)">
              Mostra Prodotti
            </button>
          </div>
        </div>
      </div>
    </section>

    <section>

      <div class="banner-container">
    <div class="banner-content">
      <h2>Scarica la nostra app!</h2>
      <p>Disponibile su</p>
      <div class="app-store-links">
        <a href="https://appstoreconnect.apple.com/login" class="app-store-link">
          <img src="public\images\apple-download.png" alt="Download on the App Store" />
        </a>
        <a href="https://play.google.com/store/games" class="play-store-link">
          <img src="public\images\Google-Play-Logo.png" alt="Get it on Google Play" />
        </a>
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
    redirectToAdvancedSearch() {
      this.$router.push({ name: 'advanced-search' });
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

.bg-btn-search{
  background: #ff6600;
  height: 10%;
  width: auto;
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

.advanced-search-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.advanced-search-btn:hover {
  background-color: #0056b3;
}

.advanced-search-btn:focus,
.advanced-search-btn:active {
  outline: none;
  background-color: #0056b3;
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
  background-color: #01e064;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.show-products-btn:hover {
  background-color: #26b968;
}

@media only screen and (max-width: 767px) {
  .hero-title {
    font-size: 24px;
  }

  .hero-subtitle {
    font-size: 14px;
  }
}

.banner-container {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
}

.banner-content {
  max-width: 600px;
  margin: 0 auto;
}

.app-store-links {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.app-store-link,
.play-store-link {
  margin: 0 10px;
}

.app-store-link img,
.play-store-link img {
  height: 40px;
}

@media (max-width: 767.98px) {
  .banner-content {
    padding: 0 10px;
  }

  .app-store-links {
    flex-direction: column;
  }

  .app-store-link,
  .play-store-link {
    margin: 10px 0;
  }
}
</style>

