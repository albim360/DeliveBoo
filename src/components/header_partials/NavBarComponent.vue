<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="path/to/logo.png" alt="Logo" height="40">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
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
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.navbar-brand img {
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
}

.navbar-brand img:hover {
  transform: rotate(360deg);
}

.navbar-nav .nav-link {
  color: #333;
  font-size: 18px;
  transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
  color: #ff6600;
}

@media (max-width: 767px) {
  .navbar-collapse {
    background-color: #fff;
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }

  .navbar-toggler {
    border: none;
    padding: 0;
    outline: none;
    background-color: transparent;
  }

  .navbar-toggler-icon {
    width: 30px;
    height: 3px;
    background-color: #333;
    display: block;
    margin: 4px;
    transition: background-color 0.3s ease;
  }

  .navbar-toggler:hover .navbar-toggler-icon {
    background-color: #ff6600;
  }

  .navbar-nav .nav-item {
    margin-bottom: 10px;
  }

  .navbar-nav .nav-link {
    color: #333;
  }
}
</style>
