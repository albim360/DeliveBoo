<template>
  <div>
    <h2>Category Card</h2>
    <div class="category-carousel">
      <div v-for="category in categories" :key="category.id" class="category-card">
        <div @click="navigateToCategory(category.id)" class="card-link">
          <div class="card-body">
            <div class="card-image" :style="{ backgroundImage: `url(${category.image})` }">
              <div class="card-title">{{ category.category_kitchen }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { id: 1, category_kitchen: 'italiano', image: '/images/cucinaItaliana.jpg' }, 
        { id: 2, category_kitchen: 'americana', image: '/images/cucinaAmericana.jpg' },
        { id: 3, category_kitchen: 'indiana', image: 'images/cucinaIndiana.webp' },
        { id: 4, category_kitchen: 'cinese', image: 'images/cucinaCinese.jpg' },
        { id: 5, category_kitchen: 'giapponese', image: 'images/cucinaGiapponese.jpg' },
        { id: 6, category_kitchen: 'coreana', image: 'images/cucinaCoreana.jpg' },
        { id: 7, category_kitchen: 'messicana', image: 'images/cucinaMessicana.jpg' },
        { id: 8, category_kitchen: 'nepalese', image: 'images/cucinaNepalese.jpg' },
        { id: 9, category_kitchen: 'malese', image: 'images/cucinaMalese.jpg' },
        { id: 10, category_kitchen: 'domenicana', image: 'images/cucinaDomenicana.jpg' },
        { id: 11, category_kitchen: 'spagnola', image: 'images/cucinaSpagnola.jpg' },
        { id: 12, category_kitchen: 'turca', image: 'images/cucinaTurca.jpeg' },
        { id: 13, category_kitchen: 'argentina', image: 'images/cucinaArgentina.jpg' },
        { id: 14, category_kitchen: 'brasiliana', image: 'images/cucinaBrasiliana.jpg' },
        { id: 15, category_kitchen: 'hawaiana', image: 'images/cucinaHawaiana.jpg' },
        { id: 16, category_kitchen: 'greca', image: 'images/cucinaGreca.webp' },
        { id: 17, category_kitchen: 'rumena', image: 'images/cucinaRumena.jpg' },
        { id: 18, category_kitchen: 'moldava', image: 'images/cucinaMoldava.webp' },
      ],
    };
  },
  methods: {
    navigateToCategory(categoryId) {
      this.$router.push({ name: 'category-restaurants', params: { categoryId } });
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
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.card-body {
  padding: 5px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}

.card-image {
  height: 150px;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-link {
  text-decoration: none;
  color: inherit;
}
</style>
