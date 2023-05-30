<template>
    <div>
        <h2>Carrello</h2>
        <ul>
            <li v-for="product in cart" :key="product.id">
                {{ product.name }} - {{ product.price | currency }}
                <button @click="removeFromCart(product)">Rimuovi</button>
            </li>
        </ul>
        <p>Totale: {{ calculateTotalPrice() | currency }}</p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            cart: [],
        };
    },
    methods: {
        removeFromCart(product) {
            const index = this.cart.indexOf(product);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        },
        calculateTotalPrice() {
            return this.cart.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2);
        },
    },
    filters: {
        currency(value) {
            return parseFloat(value).toFixed(2);
        },
    },
};
</script>

<style scoped></style>
  