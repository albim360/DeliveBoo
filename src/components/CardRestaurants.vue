<script>
export default {
    props: {
        restaurant: {
            type: Object,
            required: true
        }
    },
}
</script>

<template>
    <div >
        <router-link :to="{name: 'single-restaurant'}">
            <h3>{{ restaurant.company_name }}</h3>
            <p>{{ restaurant.description }}</p>
        </router-link>
    </div>
</template>

<style scoped>

</style>