<template>
    <div class="container card my-4">
      <h1>Ricerca Ristoranti</h1>
      <div class="search-bar">
        <input class="search-input" v-model="searchQuery" type="text" placeholder="Cerca per nome ristorante">
        <button class="search-btn" @click="startSearch">Cerca</button>
      </div>
      <div class="row d-flex card-body">
        <div class="col row col-type d-flex">
          <label for="cook-type">Cucina</label>
          <div class="form-check col-2" v-for="typology in sortedTypologies" :key="typology.slug">
            <input class="form-check-input" type="checkbox" :value="typology.id" id="typology-{{typology.slug}" v-model="selectedTypologies">
            <label class="form-check-label text-capitalize" for="typology-{{typology.slug}">{{ typology.slug }}</label>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h3 class="result-title">Risultati:</h3>
          <ul class="result-list">
            <li v-for="restaurant in filteredRestaurants" :key="restaurant.id" class="result-item">
              <h4>{{ restaurant.company_name }}</h4>
              <p>{{ getPreviewText(restaurant.description, searchQuery) }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        typologies: [],
        searchQuery: '',
        selectedTypologies: [],
        filteredRestaurants: [],
      };
    },
    methods: {
      fetchTypologies() {
        axios.get('/api/typologies')
          .then(response => {
            this.typologies = response.data.results;
          })
          .catch(error => {
            console.error(error);
          });
      },
      startSearch() {
        axios.get('/api/advanced-search', {
          params: {
            search: this.searchQuery,
            typologies: this.selectedTypologies,
          },
        })
        .then(response => {
          this.filteredRestaurants = response.data;
        })
        .catch(error => {
          console.error(error);
        });
      },
      getPreviewText(text, query) {
        if (query && text) {
          const lowerCaseQuery = query.toLowerCase();
          const words = text.split(' ');
          const highlightedWords = words.map(word => {
            if (word.toLowerCase().includes(lowerCaseQuery)) {
              return `<span class="highlight">${word}</span>`;
            }
            return word;
          });
          return highlightedWords.join(' ');
        }
        return text;
      },
    },
    computed: {
      sortedTypologies() {
        return this.typologies.sort((a, b) => a.slug.localeCompare(b.slug));
      },
    },
    created() {
      this.fetchTypologies();
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    flex-grow: 1;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  
  .search-btn {
    margin-left: 10px;
    padding: 8px 16px;
    background-color: #ffcc00;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .result-title {
    margin-top: 20px;
    font-size: 24px;
  }
  
  .result-list {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }
  
  .result-item {
    margin-bottom: 20px;
  }
  
  .highlight {
    background-color: #ffcc00;
    color: #ffffff;
    padding: 2px 4px;
  }
  
  </style>
  