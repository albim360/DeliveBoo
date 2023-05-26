<template>
  <div>
    <h2>Category Card</h2>
    <div class="category-carousel">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <router-link :to="getRestaurantLink(category.id)" class="card-link">
          <div class="card-body">
            <h5 class="card-title">{{ category.category_kitchen }}</h5>
            <div class="card-image" :style="{ backgroundImage: 'url(' + category.image + ')' }"></div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      categories: [
        { id: 1, category_kitchen: 'italiano', image: '../../assets/images/cucina-italiana.jpg' },
        { id: 2, category_kitchen: 'americana', image: 'path/to/american-image.jpg' },
        { id: 3, category_kitchen: 'indiana', image: 'path/to/indian-image.jpg' },
        { id: 4, category_kitchen: 'cinese', image: 'path/to/chinese-image.jpg' },
        { id: 5, category_kitchen: 'giapponese', image: 'path/to/japanese-image.jpg' },
        { id: 6, category_kitchen: 'coreana', image: 'path/to/korean-image.jpg' },
        { id: 7, category_kitchen: 'messicana', image: 'path/to/mexican-image.jpg' },
        { id: 8, category_kitchen: 'nepalese', image: 'path/to/nepalese-image.jpg' },
        { id: 9, category_kitchen: 'malese', image: 'path/to/malaysian-image.jpg' },
        { id: 10, category_kitchen: 'domenicana', image: 'path/to/dominican-image.jpg' },
        { id: 11, category_kitchen: 'spagnola', image: 'path/to/spanish-image.jpg' },
        { id: 12, category_kitchen: 'turca', image: 'path/to/turkish-image.jpg' },
        { id: 13, category_kitchen: 'argentina', image: 'path/to/argentinian-image.jpg' },
        { id: 14, category_kitchen: 'brasiliana', image: 'path/to/brazilian-image.jpg' },
        { id: 15, category_kitchen: 'hawaiana', image: 'path/to/hawaiian-image.jpg' },
        { id: 16, category_kitchen: 'greca', image: 'path/to/greek-image.jpg' },
        { id: 17, category_kitchen: 'rumena', image: 'path/to/romanian-image.jpg' },
        { id: 18, category_kitchen: 'moldava', image: 'path/to/moldavian-image.jpg' },
      ],
    };
  },
  methods: {
    getRestaurantLink(categoryId) {
      return {
        name: 'restaurants',
        params: { categoryId },
      };
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
