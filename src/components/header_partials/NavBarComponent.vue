<template>
    <div class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="path/to/logo.png" alt="Logo" height="40">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Accedi</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Registrati</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Prodotti</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/cart">Carrello</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeliveryHeader',
  };
  </script>
  