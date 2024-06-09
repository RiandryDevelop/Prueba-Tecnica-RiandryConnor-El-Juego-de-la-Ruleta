<!-- RouletteForm.vue -->
<template>
  <div id="game">
    <table bgcolor="white" width="400" height="500">
      <tr v-for="row in grid" :key="row[0]">
        <td v-for="cell in row" :key="cell" :id="cell" @click="putmoney(cell)">
          {{ cell }}
        </td>
      </tr>
      <tr>
        <td id="money" colspan="4">{{ player }} You Have {{ balance}}$</td>
        <td id="bet" colspan="4">
          <label for="bet">
            <input type="number" name="bet" id="betInput" v-model.number="betAmount" :max="balance" />
          </label>
        </td>
        <td colspan="4">
          <button @click="saveBalance('continue')">Continue</button>
          <button @click="saveBalance('continueAndSave')">Continue and Save</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["player", "balance"],
  data() {
    return {
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
        [13, 14, 15, "EVEN"],
        [16, 17, 18],
        [19, 20, 21, "ODD"],
        [22, 23, 24],
        [25, 26, 27, "RED"],
        [28, 29, 30],
        [31, 32, 33, "BLACK"],
        [34, 35, 36]
      ],      
      selected: [],
      betAmount: 0
    };
  },
  methods: {
    putmoney(cell) {
      if (!this.betAmount) return;

      const isNumber = !isNaN(cell);
      const isEvenOrOdd = cell === "EVEN" || cell === "ODD";
      const isColor = cell === "RED" || cell === "BLACK";

      // Handle deselection
      if (this.selected.includes(cell)) {
        this.selected = this.selected.filter(c => c !== cell);
        this.total += parseInt(this.betAmount);
        this.updateCellStyle(cell, "");
        return;
      }

      // Apply selection rules
      if (isNumber && !this.selected.some(sel => !isNaN(sel))) {
        this.selected.push(cell);
        this.total -= parseInt(this.betAmount);
        this.updateCellStyle(cell, "gray");
      } else if (isEvenOrOdd && !this.selected.some(sel => sel === "EVEN" || sel === "ODD") && !this.selected.some(sel => !isNaN(sel))) {
        this.selected.push(cell);
        this.total -= parseInt(this.betAmount);
        this.updateCellStyle(cell, "gray");
      } else if (isColor && this.selected.some(sel => sel === "EVEN" || sel === "ODD" || !isNaN(sel))) {
        this.selected.push(cell);
        this.total -= parseInt(this.betAmount);
        this.updateCellStyle(cell, "gray");
      } else {
        alert("Invalid selection. Please follow the rules.");
      }

      this.checkWin();
    },
    updateCellStyle(cell, color) {
      const element = document.getElementById(cell);
      if (element) {
        element.style.backgroundColor = color;
      }
    },
    checkWin() {
      const winningNumber = Math.floor(Math.random() * 37);
      const winningColor = winningNumber % 2 === 0 ? "RED" : "BLACK";

      this.selected.forEach(selection => {
        if (!isNaN(selection)) {
          if (parseInt(selection) === winningNumber) {
            this.total += parseInt(this.betAmount) * 35; // 35x payout for exact number
          } else {
            this.total -= parseInt(this.betAmount);
          }
        } else if (selection === "EVEN" || selection === "ODD") {
          if ((selection === "EVEN" && winningNumber % 2 === 0) || (selection === "ODD" && winningNumber % 2 !== 0)) {
            this.total += parseInt(this.betAmount) * 2; // 2x payout for even/odd
          } else {
            this.total -= parseInt(this.betAmount);
          }
        } else if (selection === "RED" || selection === "BLACK") {
          if (selection === winningColor) {
            this.total += parseInt(this.betAmount) * 1.5; // 1.5x payout for color
          } else {
            this.total -= parseInt(this.betAmount);
          }
        }
      });

      this.total = Math.round(this.total * 100) / 100; // Round to 2 decimal places
      document.getElementById("money").innerText = `You Have ${this.total}$`;

      sessionStorage.setItem('userData', JSON.stringify({ name: this.player, balance: this.total }));
    },
    saveBalance(action) {
      if (action === 'continue') {
        sessionStorage.setItem('userData', JSON.stringify({ name: this.player, balance: this.total }));
      } else if (action === 'continueAndSave') {
        // Replace 'this.$http.put' with your actual HTTP request method
        // this.$http.put(`${apiUrl}/api/users/${this.player}`, { balance: this.total })
        //   .then(response => {
        //     console.log('Balance saved:', response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error saving balance:', error);
        //   });
        console.log("Balance saved:", this.total);
      }
    }
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
