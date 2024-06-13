import { Store } from 'pinia';
import { Ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL_PROD;

export const RouletteFormService = (
  selected: Ref<(string | number)[]>,
  betAmount: Ref<number>,
  bet: Ref<{ number: number | null; type: '' | 'EVEN' | 'ODD'; color: '' | 'RED' | 'BLACK' }>,
  grid: Ref<(string | number)[][]>,
  store: Store<
    'spinner',
    { canSpin: boolean; balance: number; username: string },
    {},
    { toggleSpin(): void; newBalance(newBalance: number): void; saveState(): void; loadBalance(): Promise<void> }
  >
) => {
  const putMoney = (cell: number | string) => {
    if (!betAmount.value) {
      alert('Please enter a bet amount first.');
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
    updateCellStyle(cell, 'green');
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
    const playerName = JSON.parse(sessionStorage.getItem('userData') || '{}').name;

    if (!playerName) {
      console.error('Player name not found in session storage.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/Roulette/bet`, {
        method: 'POST',
        body: JSON.stringify({
          playerName,
          amount: betAmount.value,
          color: bet.value.color,
          number: bet.value.number,
          type: bet.value.type,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      sessionStorage.setItem('betResult', JSON.stringify(data));

      setTimeout(() => {
        store.newBalance();
        store.saveState();
        resetForm();
        alert(data.prize >= 1 ? `You won ${data.prize}!` : `You lose! ${data.prize}`);
      }, 2000);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const continueGame = async () => {
    if (betAmount.value > store.balance) {
      alert("You don't have enough balance to place this bet!");
      return;
    }

    store.toggleSpin();
    await checkWin();
  };

  const saveBalance = async () => {
    const betResult = JSON.parse(sessionStorage.getItem('betResult') || '{}');
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    if (!userData.name || betResult.newBalance === undefined) {
      console.error('User data or bet result not found in session storage.');
      return;
    }

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

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(`New Balance is: ${data.balance}`);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return {
    grid,
    selected,
    betAmount,
    bet,
    putMoney,
    updateCellStyle,
    continueGame,
    saveBalance,
    resetForm,
    checkWin,
  };
};
