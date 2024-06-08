<template>
  <div id="game">
    <table bgcolor="white" width="400" height="500">
      <tr>
        <td id="1" @click="putmoney">1</td>
        <td id="2" @click="putmoney">2</td>
        <td id="3" @click="putmoney">3</td>
        <td id="40" rowspan="4">1st 12</td>
        <td id="43" rowspan="2">1 to 18</td>
      </tr>
      <tr>
        <td id="4" @click="putmoney">4</td>
        <td id="5" @click="putmoney">5</td>
        <td id="6" @click="putmoney">6</td>
      </tr>
      <tr>
        <td id="7" @click="putmoney">7</td>
        <td id="8" @click="putmoney">8</td>
        <td id="9" @click="putmoney">9</td>
        <td id="46" rowspan="2">EVEN</td>
      </tr>
      <tr>
        <td id="10" @click="putmoney">10</td>
        <td id="11" @click="putmoney">11</td>
        <td id="12" @click="putmoney">12</td>
      </tr>
      <tr>
        <td id="13" @click="putmoney">13</td>
        <td id="14" @click="putmoney">14</td>
        <td id="15" @click="putmoney">15</td>
        <td id="41" rowspan="4">2nd 12</td>
        <td id="44" rowspan="2">19 to 36</td>
      </tr>
      <tr>
        <td id="16" @click="putmoney">16</td>
        <td id="17" @click="putmoney">17</td>
        <td id="18" @click="putmoney">18</td>
      </tr>
      <tr>
        <td id="19" @click="putmoney">19</td>
        <td id="20" @click="putmoney">20</td>
        <td id="21" @click="putmoney">21</td>
        <td id="47" rowspan="2">ODD</td>
      </tr>
      <tr>
        <td id="22" @click="putmoney">22</td>
        <td id="23" @click="putmoney">23</td>
        <td id="24" @click="putmoney">24</td>
      </tr>
      <tr>
        <td id="25" @click="putmoney">25</td>
        <td id="26" @click="putmoney">26</td>
        <td id="27" @click="putmoney">27</td>
        <td id="42" rowspan="4">3rd 12</td>
        <td id="45" rowspan="2">RED</td>
      </tr>
      <tr>
        <td id="28" @click="putmoney">28</td>
        <td id="29" @click="putmoney">29</td>
        <td id="30" @click="putmoney">30</td>
      </tr>
      <tr>
        <td id="31" @click="putmoney">31</td>
        <td id="32" @click="putmoney">32</td>
        <td id="33" @click="putmoney">33</td>
        <td id="48" rowspan="2">BLACK</td>
      </tr>
      <tr>
        <td id="34" @click="putmoney">34</td>
        <td id="35" @click="putmoney">35</td>
        <td id="36" @click="putmoney">36</td>
      </tr>
      <tr>
        <td id="37" @click="putmoney">2 to 1</td>
        <td id="38" @click="putmoney">2 to 1</td>
        <td id="39" @click="putmoney">2 to 1</td>
        <td id="money" colspan="2">You Have {{ total }}$</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    putmoney(event) {
      const td = event.target;
      if (td.className !== "in") {
        td.bgColor = "gray";
        td.className = "in";
        this.total += 10;
      } else {
        td.bgColor = "#B2E0F0";
        td.className = "";
        this.total -= 10;
      }
      this.checkwin();
    },
    checkwin() {
      let answer = Math.floor(Math.random() * 37); // Número aleatorio entre 0 y 36
      if (answer !== 0 && answer !== "00") {
        for (let i = 1; i <= 36; i++) {
          if (document.getElementById(i).className === "in") {
            if (parseInt(document.getElementById(i).innerHTML) === answer) {
              this.total += 350; // Ganancia neta (360 de pago menos 10 de apuesta)
            } else {
              this.total -= 10;
            }
          }
        }
        // Lógica adicional para otros tipos de apuestas puede ser añadida aquí
      } else {
        // Lógica para manejar el caso de que no haya un número ganador
      }
      document.getElementById("money").innerHTML = "You Have " + this.total + "$";
    }
  },
  data() {
    return {
      total: 1000
    };
  }
};
</script>

<style scoped>
td {
  text-align: center;
  border: 1px solid black;
  cursor: pointer;
}
</style>
