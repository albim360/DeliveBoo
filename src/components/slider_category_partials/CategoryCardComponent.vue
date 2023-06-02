<template>
  <div>
    <h2>Esplora le Categorie di Cucina</h2>
    <div class="category-carousel">
      <div v-for="(category, index) in visibleCategories" :key="category.id" class="category-card"
        :class="{ 'active': category.active }">
        <div @click="navigateToCategory(category.id)" class="card-link">
          <div class="card-image" :style="{ backgroundImage: `url(${category.image})` }">
            <div class="card-overlay">
              <div class="card-title">{{ category.category_kitchen }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel-controls">
      <button @click="previousSlide" :disabled="currentIndex === 0">←</button>
      <button @click="nextSlide" :disabled="currentIndex >= visibleCategories.length - 2">→</button>
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
      currentIndex: 0,
      visibleCategories: [],
      activeIndex: null,
    };
  },
  computed: {
    sortedCategories() {
      const sortedArray = [...this.categories];
      sortedArray.sort((a, b) => a.category_kitchen.localeCompare(b.category_kitchen));
      return sortedArray;
    },
  },
  mounted() {
    this.updateVisibleCategories();
  },
  methods: {
    navigateToCategory(categoryId) {
      this.activeIndex = categoryId;
      this.$router.push({ name: 'category-restaurants', params: { categoryId } });
    },
    previousSlide() {
      this.currentIndex -= 2;
      this.updateVisibleCategories();
    },
    nextSlide() {
      this.currentIndex += 2;
      this.updateVisibleCategories();
    },
    updateVisibleCategories() {
      const startIndex = this.currentIndex;
      this.visibleCategories = this.sortedCategories.slice(startIndex, startIndex + 12);
    },
  },
};
</script>

<style scoped>
.category-card.active {
  animation: slideRight 0.5s ease forwards;
}

@keyframes slideRight {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
}

.category-carousel {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}

.category-card {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  position: relative;

}

.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.card-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  transition: left 0.5s ease;
  z-index: 1;
}

.card-image:hover::before {
  left: 0;
}

.card-image {
  height: 150px;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image:hover .card-overlay {
  opacity: 1;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
}

.carousel-controls {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.carousel-controls button {
  margin: 0 5px;
  padding: 5px 10px;
  font-size: 20px;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .category-carousel {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>


