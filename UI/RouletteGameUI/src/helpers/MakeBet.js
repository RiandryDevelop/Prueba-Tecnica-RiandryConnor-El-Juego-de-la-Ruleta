export const MakeABet = async (betAmount, bet, apiUrl, store, resetForm) => {
    const playerName = JSON.parse(sessionStorage.getItem('userData') || '{}').name;
    if (!playerName) {
        console.error('Player name not found in session storage.');
        return;
    }
    const isNumber = !isNaN(Number(bet.value.number));
    const isEvenOrOdd = bet.value.type === 'EVEN' || bet.value.type === 'ODD';
    const isColor = bet.value.color === 'RED' || bet.value.color === 'BLACK';
    // bet only for color 
    if (isColor && !isNumber && !isEvenOrOdd) {
        try {
            const response = await fetch(`${apiUrl}/api/Roulette/bet`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName,
                    amount: betAmount.value,
                    color: bet.value.color.toLowerCase()
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
        }
        catch (error) {
            console.error('Error sending data:', error);
        }
    }
    // bet only for number and color 
    if (isColor && isNumber && !isEvenOrOdd) {
        try {
            const response = await fetch(`${apiUrl}/api/Roulette/bet`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName,
                    amount: betAmount.value,
                    color: bet.value.color.toLowerCase(),
                    number: bet.value.number
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
        }
        catch (error) {
            console.error('Error sending data:', error);
        }
    }
    // bet only for type and color 
    if (isColor && isEvenOrOdd) {
        try {
            const response = await fetch(`${apiUrl}/api/Roulette/bet`, {
                method: 'POST',
                body: JSON.stringify({
                    playerName,
                    amount: betAmount.value,
                    color: bet.value.color.toLowerCase(),
                    type: bet.value.type
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
        }
        catch (error) {
            console.error('Error sending data:', error);
        }
    }
};
