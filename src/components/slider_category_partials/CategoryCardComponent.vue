<template>
  <div>
    <h2>Category Card</h2>
    <div class="category-carousel">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <router-link :to="getRestaurantLink(category.id)" class="card-link">
          <div class="card-body">
            <h5 class="card-title">{{ category.category_kitchen }}</h5>
            <div class="card-image" :style="cardImageStyle(category.image)"></div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    getRestaurantLink(categoryId) {
      return {
        name: 'restaurants',
        params: { categoryId },
      };
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/typologies');
        this.categories = response.data.results;
      } catch (error) {
        console.error(error);
      }
    },
    cardImageStyle(imageName) {
      return { backgroundImage: `url(/assets/images/${imageName}.jpg)` };
    },
  },
};
</script>

<style scoped>
.category-carousel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.category-card {
  width: calc(25% - 20px);
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-body {
  padding: 10px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-image {
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
}

.card-link {
  text-decoration: none;
  color: inherit;
}
</style>
