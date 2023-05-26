<template>
    <div class="delivery-header">
        <div class="logo">
            <img src="path/to/logo.png" alt="Logo">
        </div>
        <div class="links">
            <router-link to="/login">Accedi</router-link>
            <router-link to="/register">Registrati</router-link>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'DeliveryHeader',
};
</script>
  
<style>
.delivery-header {
    background-color: #f2f2f2;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.logo img {
    height: 40px;
    width: auto;
}

.links {
    display: flex;
    gap: 10px;
}

.links a {
    text-decoration: none;
    color: #333333;
    font-size: 16px;
}
</style>
  