# Roulette Game Project

## Overview

The Roulette Game project is a comprehensive application comprising a frontend built with Vue 3 and Pinia for state management, and a backend API built using ASP.NET Core and Entity Framework Core. The project allows users to place bets, spin the roulette wheel, and manage their balances. 

## Table of Contents

- [Overview](#overview)
- [Frontend](#frontend)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
- [Backend API](#backend-api)
  - [Prerequisites](#prerequisites-1)
  - [Installation](#installation-1)
  - [Configuration](#configuration)
  - [Usage](#usage-1)
  - [Project Structure](#project-structure-1)
  - [Testing](#testing)
  - [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Frontend

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher) or [Yarn](https://yarnpkg.com/) (v1.22 or higher)

### Installation

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

### Setup

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

### Usage

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

### Project Structure

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

## Backend API

### Prerequisites

- .NET SDK
- SQL Server
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Restore dependencies:**

   ```bash
   dotnet restore
   ```

### Configuration

#### Environment Variables

The following environment variables are required for configuring the project:

- `DB_CONNECTION_STRING`: Connection string to the SQL Server database.
- `ASPNETCORE_ENVIRONMENT`: Execution environment (Development, Staging, Production).

#### Database Configuration

1. **Create the database.**
2. **Apply migrations:**

   ```bash
   dotnet ef database update
   ```

### Usage

#### Examples of Use

Some examples of how to interact with the API.

#### Main Endpoints

- `POST /api/user/updateBalance`: Updates the balance of a user.
- `GET /api/user/{name}`: Retrieves the balance of a user.
- `POST /api/roulette/initialize`: Initializes a player.
- `POST /api/roulette/bet`: Places a bet.

### Project Structure

- **Controllers/:** API controllers.
- **Models/:** Data models.
- **Data/:** Database context and migrations.
- **Program.cs:** Application entry point.

### Testing

#### How to Run Tests

```bash
dotnet test
```

### Deployment

#### Steps for Production Deployment

1. **Build the project:**

   ```bash
   dotnet publish --configuration Release
   ```

2. **Configure the production server.**
3. **Deploy the published files.**

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

## Contact

Author: Riandry Dev  
Email: riandrydevsoffers@gmail.com

---

This README file provides a comprehensive guide to understanding, setting up, using, and contributing to the Roulette Game project. For any further questions or issues, please refer to the source code or contact the maintainer of this project.
