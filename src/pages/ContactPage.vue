<template>
    <div class="contatti">
      <h1>Contatti</h1>
      <p>Per qualsiasi informazione o richiesta, puoi contattarci utilizzando i seguenti contatti:</p>
      <div class="contatti-info">
        <div class="contatto">
          <i class="fas fa-envelope"></i>
          <p>Email: info@deliveboo.it</p>
        </div>
        <div class="contatto">
          <i class="fas fa-phone"></i>
          <p>Telefono: +39 123 456789</p>
        </div>
        <div class="contatto">
          <i class="fas fa-map-marker-alt"></i>
          <p>Indirizzo: Via del Gusto, 1, 00100 Roma</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
  };
  </script>
  
  <style scoped>
  .contatti {
    text-align: center;
    margin-top: 40px;
  }
  
  .contatti h1 {
    font-size: 24px;
    font-weight: bold;
  }
  
  .contatti p {
    font-size: 18px;
    margin-top: 20px;
  }
  
  .contatti-info {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
  
  .contatto {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  
  .contatto i {
    font-size: 20px;
    margin-right: 10px;
  }
  
  .contatto p {
    font-size: 16px;
  }
  
  @media (max-width: 767px) {
    .contatti-info {
      flex-direction: column;
    }
  
    .contatto {
      margin-bottom: 20px;
    }
  }
  </style>
  