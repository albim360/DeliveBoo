<template>
    <div>
        <h2>{{ restaurant.company_name }}</h2>
        <p>{{ restaurant.description }}</p>
        <p>{{ restaurant.telephone }}</p>
        <p>{{ restaurant.address }}</p>
        <div v-for="typology in restaurant.typologies" :key="typology.id">
            <span class="typology">{{ typology.category_kitchen }}</span>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        restaurant: {
            type: Object,
            required: true,
        },
    },
};
</script>
  
<style scoped>
.typology {
    display: inline-block;
    background-color: #ffcc00;
    color: #ffffff;
    border-radius: 20px;
    padding: 5px 10px;
    margin-right: 5px;
}
</style>
  