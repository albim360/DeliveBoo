<template>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>Deliveboo</h5>
            <p>Un modo semplice per ordinare il tuo cibo preferito a domicilio.</p>
          </div>
          <div class="col-md-3">
            <h5>Categorie</h5>
          </div>
          <div class="col-md-3">
            <h5>Contatti</h5>
            <ul>
              <li><a href="#">Assistenza</a></li>
              <li><a href="#">Termini e condizioni</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        <hr>
        <div class="text-center">
          <p>&copy; {{ currentYear }} Deliveboo. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  .footer {
    padding: 40px 0;
    background-color: #f8f9fa;
  }
  
  h5, h6 {
    font-weight: bold;
  }
  
  ul {
    list-style: none;
    padding-left: 0;
  }
  
  ul li {
    margin-bottom: 8px;
  }
  
  a {
    color: #333;
    text-decoration: none;
  }
  
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #ccc;
  }
  </style>
  