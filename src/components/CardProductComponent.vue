<template>
    <div class="card">
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <p>{{ product.description }}</p>
        <button @click="addToCart">Aggiungi al carrello</button>
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
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
}

.card h3 {
    margin-top: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
}

.card p {
    margin-bottom: 10px;
    color: #666666;
}

button {
    background-color: #ffcc00;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
}
</style>

  
  
  