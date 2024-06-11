# Roulette Game API Documentation

## Overview

The Roulette Game API provides endpoints to manage user balances and place bets in a simulated roulette game. This API is built using ASP.NET Core and Entity Framework Core.

## Table of Contents

- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installation Steps](#installation-steps)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Database Configuration](#database-configuration)
- [Usage](#usage)
  - [Examples of Use](#examples-of-use)
  - [Main Endpoints](#main-endpoints)
- [Project Structure](#project-structure)
- [Testing](#testing)
  - [How to Run Tests](#how-to-run-tests)
- [Deployment](#deployment)
  - [Steps for Production Deployment](#steps-for-production-deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

### Prerequisites

- .NET SDK
- SQL Server
- Docker (optional, for containerized deployment)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Configure environment variables (see [Configuration](#configuration)).
4. Run the application:
   ```bash
   dotnet run
   ```

## Configuration

### Environment Variables

The following environment variables are required for configuring the project:

- `DB_CONNECTION_STRING`: Connection string to the SQL Server database.
- `ASPNETCORE_ENVIRONMENT`: Execution environment (Development, Staging, Production).

### Database Configuration

Instructions to set up the database:

1. Create the database.
2. Apply migrations:
   ```bash
   dotnet ef database update
   ```

## Usage

### Examples of Use

Some examples of how to interact with the API.

### Main Endpoints

- `POST /api/user/updateBalance`: Updates the balance of a user.
- `GET /api/user/{name}`: Retrieves the balance of a user.
- `POST /api/roulette/initialize`: Initializes a player.
- `POST /api/roulette/bet`: Places a bet.

## Project Structure

Description of the project structure:

- `Controllers/`: API controllers.
- `Models/`: Data models.
- `Data/`: Database context and migrations.
- `Program.cs`: Application entry point.

## Testing

### How to Run Tests

Instructions for running tests:

```bash
dotnet test
```

## Deployment

### Steps for Production Deployment

Instructions for deploying the application to a production environment.

1. Build the project:
   ```bash
   dotnet publish --configuration Release
   ```
2. Configure the production server.
3. Deploy the published files.

## Contributing

Instructions for contributing to the project:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Author: Riandry Dev
Email: riandrydevsoffers@gmail.com

---

This README file provides a comprehensive guide to understanding, setting up, using, and contributing to the Roulette Game API. For any further questions or issues, please refer to the source code or contact the maintainer of this project.