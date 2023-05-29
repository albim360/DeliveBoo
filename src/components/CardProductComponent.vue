<template>
    <div class="card">
      <div class="card-image">
        <img :src="product.image" :alt="product.name" class="product-image" />
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ product.name }}</h3>
        <p class="card-price">{{ product.price }}</p>
        <p class="card-description">{{ product.description }}</p>
        <button class="card-button" @click="addToCart">Aggiungi al carrello</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.product);
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #f0f8ff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .card-image {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .card-title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
    color: #000080;
    text-align: center;
  }
  
  .card-price {
    margin: 0;
    font-size: 18px;
    color: #4169e1;
  }
  
  .card-description {
    margin-bottom: 10px;
    color: #333333;
    text-align: center;
  }
  
  .card-button {
    background-color: #4682b4;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>
  