# Titan - Cryptocurrency Wallet Backend

## Overview

**Titan** is a cryptocurrency wallet backend built using **TypeScript**, **NestJS**, and **PostgreSQL**. It supports the management and transactions of five major cryptocurrencies: **Bitcoin (BTC)**, **Litecoin (LTC)**, **Solana (SOL)**, **Ethereum (ETH)**, and **Tether (USDT)**. This project is designed to be secure, scalable, and easily extendable for additional features and currencies in the future.

## Features

- **Multi-Currency Support**: Manage and transact in Bitcoin, Litecoin, Solana, Ethereum, and Tether.
- **User Authentication**: Secure user authentication using JWT (JSON Web Token).
- **Wallet Management**: Create and manage cryptocurrency wallets for different users.
- **Transaction Handling**: Send and receive cryptocurrency transactions with real-time tracking.
- **History Tracking**: Keep track of transaction history for auditing and review.
- **PostgreSQL Integration**: Store and manage user data and wallet information efficiently with PostgreSQL.
- **TypeScript & NestJS**: Strongly typed backend development with a modular and scalable architecture.

## Technologies

- **TypeScript**: Ensures type safety and better development practices.
- **NestJS**: Provides a powerful framework for building efficient and scalable server-side applications.
- **PostgreSQL**: A reliable and performant relational database for storing user and wallet data.
- **JWT**: Used for secure user authentication and authorization.

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **PostgreSQL** (v12.x or higher)
- **Yarn** or **npm**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/titan.git
   cd titan
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run Database Migration**

   ```bash
   npm run migration:run
   ```

4. **Start Server**
   ```bash
   npm start
   ```

## Stay in touch

- Author - [Solomon Akpuru](https://solobarine.netlify.app)
- LinkedIn - [https://linkedin.com/in/solomon-akpuru](https://linkedin.com/in/solomon-akpuru)

## License

Titan Backend is [MIT licensed](LICENSE).
