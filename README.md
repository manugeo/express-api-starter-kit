# Express API Starter Kit

A modern Express.js starter template for building RESTful APIs with TypeScript, ESLint, and MongoDB integration.

## Features

- **TypeScript** - Write more reliable, maintainable code with static typing
- **Express.js** - Fast, unopinionated, minimalist web framework for Node.js
- **ESLint** - Modern linting with the latest ESLint v9 configuration
- **MongoDB Integration** - Ready-to-use Mongoose setup for MongoDB connectivity
- **Hot Reloading** - Automatic server restart during development
- **Environment Variables** - Built-in dotenv configuration
- **CORS Support** - Cross-Origin Resource Sharing enabled

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas URI)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/express-api-starter-kit.git
cd express-api-starter-kit
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

Your API will be available at http://localhost:3000

### Available Scripts

- `npm run dev` - Starts the development server with hot-reloading
- `npm run build` - Builds the TypeScript code for production
- `npm start` - Runs the built application in production mode
- `npm run lint` - Runs ESLint to check for code issues
- `npm run lint:fix` - Fixes automatically fixable ESLint issues

## Project Structure

```
express-api-starter-kit/
├── src/                    # Source directory
│   ├── index.ts            # Application entry point
├── dist/                   # Compiled JavaScript (build output)
├── node_modules/           # Node.js dependencies
├── .env                    # Environment variables (create this)
├── .gitignore              # Git ignore file
├── eslint.config.mjs       # ESLint configuration
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Future Additions

- [ ] Add authentication with JWT
- [ ] Set up automated testing with Jest
- [ ] Add request validation with Joi/Zod
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Add Docker configuration
- [ ] Implement logging with Winston/Pino

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.