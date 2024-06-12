import {   Ref} from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
export const RouletteFormService =(selected: Ref<(string | number)[]>,
betAmount: Ref<number>,
total: Ref<number>,bet: Ref<any>, 
store: { message: boolean; }, grid: Ref<(string | number)[][]>)=>{      

      const putMoney = (cell: number | string) => {
        if (!betAmount.value) {
          alert("Please enter a bet amount first.");
          return;
        }
  
        const isNumber = !isNaN(Number(cell));
        const isEvenOrOdd = cell === 'EVEN' || cell === 'ODD';
        const isColor = cell === 'RED' || cell === 'BLACK';
  
        if (isNumber && bet.value.number === null && bet.value.type === '') {
          bet.value.number = Number(cell);
        } else if (isEvenOrOdd && bet.value.type === '' && bet.value.number === null) {
          bet.value.type = cell as 'EVEN' | 'ODD';
        } else if (isColor && bet.value.color === '') {
          bet.value.color = cell as 'RED' | 'BLACK';
        } else {
          alert('Invalid selection. Please select a valid combination.');
          return;
        }
  
        selected.value.push(cell);
        updateCellStyle(cell, 'gray');
      };
  
      const updateCellStyle = (cell: number | string, color: string) => {
        const element = document.getElementById(cell.toString());
        if (element) {
          element.style.backgroundColor = color;
        }
      };
  
      const resetForm = () => {
        selected.value.forEach(cell => updateCellStyle(cell, 'white'));
        selected.value = [];
        bet.value = { number: null, type: '', color: '' };
        betAmount.value = 0;
      };
  
      const checkWin = async () => {
        
        const playerName = JSON.parse(sessionStorage.getItem('userData') || '{}');
        try {
          const response = await fetch(`${apiUrl}/api/Roulette/bet`, {
            method: 'POST',
            body: JSON.stringify({
              playerName: playerName.name,
              amount: betAmount.value,
              color: bet.value.color,
              Number: bet.value.number,
              type: bet.value.type
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          store.message = true;  
          sessionStorage.setItem("betResult", JSON.stringify(data));  
          total.value = data.newBalance;
          resetForm(); 
          
        } catch (error) {
          console.error('Error sending data:', error);
        } 
      };
  
      const continueGame = async () => {
          await checkWin();
        }
      const saveBalance = async() => {
        const betResult = JSON.parse(sessionStorage.getItem('betResult') || '{}');
        const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');        
          try {
            const response = await fetch(`${apiUrl}/api/User/updateBalance`, {
              method: 'POST',
              body: JSON.stringify({
                name: userData.name,
                balance: betResult.newBalance,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            
            const data = await response.json();
            console.log("saveBalance",data);
          } catch (error) {
            console.error('Error sending data:', error);
          }     
      }

      
      return {
        grid,
        selected,
        betAmount,
        total,
        bet,
        putMoney,
        updateCellStyle,
        continueGame,
        saveBalance
      };
}