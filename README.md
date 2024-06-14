General Description
Roulette game with a Vue.js 3 frontend and a backend using ASP.NET MVC and .NET Core 8.

Objectives
Frontend (Vue.js 3):

Design a user interface for the roulette game.
Implement functionality to start the game with an initial balance and place bets.
Show the roulette result, including the number, and whether it's odd/even, red/black.
Allow the user to bet on color, odd/even of a given color, or a specific number and color.
Provide mechanisms for users to place bets, view results, and know if they have won.
Enable users to save their winnings and balance associated with their name.
Allow users to load their balance using their name.
Ensure unsaved game data is lost when the window is closed.
Backend (ASP.NET MVC and .NET Framework 4.8 or .NET Core 8):

Provide a REST API with endpoints for:
Returning a random number between 0 and 36 and a color (red/black).
Saving user balances in a SQL database.
Retrieving and updating user balances based on bets.
Calculating winnings based on the type of bet.
