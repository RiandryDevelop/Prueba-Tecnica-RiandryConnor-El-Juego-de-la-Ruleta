<template>
  <div id="game">
    <table bgcolor="white" width="400" height="500">
      <tr>
        <td id="1" @click="putmoney">1</td>
        <td id="2" @click="putmoney">2</td>
        <td id="3" @click="putmoney">3</td>
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
        <td id="46" @click="putmoney" rowspan="2">EVEN</td>
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
        <td id="47" @click="putmoney" rowspan="2">ODD</td>
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
        <td id="45" @click="putmoney" rowspan="2">RED</td>
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
        <td id="48" @click="putmoney" rowspan="2">BLACK</td>
      </tr>
      <tr>
        <td id="34" @click="putmoney">34</td>
        <td id="35" @click="putmoney">35</td>
        <td id="36" @click="putmoney">36</td>
      </tr>
      <tr>
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
      const id = td.id;

      // Check if cell is already selected
      if (td.className === "in") {
        td.bgColor = "#B2E0F0";
        td.className = "";
        this.total -= 10;

        if (!isNaN(id)) {
          this.selectedNumbers.delete(id);
        } else {
          this.selectedSpecial.delete(id);
        }

        return;
      }

      // Rules for numeric cells (0-36)
      if (!isNaN(id)) {
        if (this.selectedNumbers.size < 1) {
          td.bgColor = "gray";
          td.className = "in";
          this.total += 10;
          this.selectedNumbers.add(id);
        } else {
          alert("Only one number can be selected at a time.");
        }
      } else {
        // Rules for special cells (RED, BLACK, EVEN, ODD)
        if (this.selectedNumbers.size === 1) {
          if (id === "EVEN" || id === "ODD") {
            if (this.selectedSpecial.size === 0 || this.selectedSpecial.has("RED") || this.selectedSpecial.has("BLACK")) {
              td.bgColor = "gray";
              td.className = "in";
              this.total += 10;
              this.selectedSpecial.add(id);
            } else {
              alert("You can only select RED or BLACK after selecting EVEN or ODD.");
            }
          } else if (id === "RED" || id === "BLACK") {
            td.bgColor = "gray";
            td.className = "in";
            this.total += 10;
            this.selectedSpecial.add(id);
          }
        } else {
          alert("Select a number first before choosing RED, BLACK, EVEN, or ODD.");
        }
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
      total: 1000,
      selectedNumbers: new Set(),
      selectedSpecial: new Set()
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
