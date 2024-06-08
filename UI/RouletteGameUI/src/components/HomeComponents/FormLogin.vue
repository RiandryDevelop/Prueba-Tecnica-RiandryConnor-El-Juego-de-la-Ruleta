<template>
    <div>
      <h2>Start Game</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="player_name">UserName:</label>
          <input type="text" id="name" v-model="formData.name" required>
        </div>
        <div>
          <label for="balance">Introduce your balance:</label>
          <input type="number" id="number" v-model="formData.balance" required>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  const apiUrl = import.meta.env.VITE_API_URL;
  export default {
    data() {
      return {
        formData: {
          name: '',
          balance: '',
        }
      };
    },
    methods: {
      submitForm() {
        // Por ejemplo, puedes enviar los datos a través de una petición HTTP
        fetch(`${apiUrl}/api/Roulette/initialize`, {
          method: 'POST',
          body: JSON.stringify(this.formData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
        this.$router.push('/roulette');
      }
    }
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 10px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input[type="text"],
  input[type="number"],
  textarea {
    width: 50vw;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  button {
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  