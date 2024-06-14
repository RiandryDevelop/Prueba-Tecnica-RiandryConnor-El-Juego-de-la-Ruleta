# Roulette Game Frontend

## Overview

This frontend application is built with Vue 3 and Pinia for state management. It serves as the client-side interface for a Roulette game, allowing users to place bets, spin the roulette wheel, and see the results.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [Yarn](https://yarnpkg.com/) (v1.22 or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

## Setup

1. **Environment Variables:**

   Create a `.env` file in the root directory of the project and add the necessary environment variables:

   ```
   VITE_API_URL_PROD=<your-api-url>
   ```

2. **Run the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. **Start the Application:**

   Open your web browser and navigate to `http://localhost:3000`. You should see the login screen.

2. **Login:**

   Enter your username and initial balance to start the game.

3. **Place Bets:**

   - Select a number, color, or even/odd option to place your bet.
   - Enter the amount you wish to bet.

4. **Spin the Roulette:**

   - Click on the "Continue" button to spin the roulette wheel.
   - The result will be displayed and your balance will be updated accordingly.

5. **Save Balance:**

   - Click on the "Save Balance" button to save your current balance to the server.

6. **Logout:**

   - Click on the "Get out" button in the top right corner to log out of the game.

## Project Structure

- **main.ts:** Entry point of the application where Vue instance is created and configured.
- **App.vue:** Root component that sets up the router view.
- **routes/routes.ts:** Defines the routes for the application.
- **store/store.ts:** Pinia store definition for managing state.
- **composables/SpinnerRouletteService.ts:** Logic for spinning the roulette wheel.
- **composables/RouletteFormService.ts:** Logic for handling the betting form.
- **components/RouletteApp.vue:** Main layout of the game screen including the roulette wheel, form, and rules section.
- **components/RouletteForm.vue:** Component for placing bets.
- **components/SpinnerRoulette.vue:** Component for displaying and spinning the roulette wheel.
- **components/RouletteRulesSection.vue:** Component displaying the game rules.
- **components/FormLogin.vue:** Login form for starting the game.

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes.**
4. **Commit your changes:**

   ```bash
   git commit -m 'Add some feature'
   ```

5. **Push to the branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Submit a pull request.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.