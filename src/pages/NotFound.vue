<template>
    <div class="not-found">
      <h1>Pagina non trovata</h1>
      <p>La pagina che stai cercando non è disponibile.</p>
      <router-link to="/">Torna alla homepage</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 40px;
  }
  
  .not-found h1 {
    font-size: 24px;
    font-weight: bold;
  }
  
  .not-found p {
    font-size: 18px;
    margin-top: 20px;
  }
  
  .not-found router-link {
    margin-top: 20px;
    display: inline-block;
    font-size: 16px;
    text-decoration: none;
    color: #ff6600;
    border-bottom: 1px solid #ff6600;
  }
  
  .not-found router-link:hover {
    opacity: 0.8;
  }
  </style>
  