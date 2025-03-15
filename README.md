# Express API Starter Kit

A robust, production-ready starter kit for building RESTful APIs with Express.js and TypeScript.

## Features

- **TypeScript** - Type-safe code for better reliability
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** with Mongoose - Elegant MongoDB object modeling
- **Environment Configuration** - Using dotenv and cross-env for different environments
- **Error Handling** - Using express-async-errors for automatic async error handling
- **Input Validation** - Using Zod for schema validation
- **Code Quality** - ESLint and Prettier for code consistency
- **Development Experience** - Hot reload with ts-node-dev

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd express-api-starter-kit

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env file with your configuration
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
TEST_MONGODB_URI=mongodb://localhost:27017/test-database
```

## Usage

```bash
# Development mode
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Environment Management

This project uses `cross-env` to manage environment variables across different platforms:

- **Development**: `npm run dev` sets NODE_ENV=development
- **Production**: `npm start` sets NODE_ENV=production
- **Test**: `npm test` sets NODE_ENV=test

## Project Structure

```
src/
├── controllers/     # Route controllers
├── models/          # Mongoose models
├── schemas/         # Zod validation schemas
├── utils/           # Utility functions
│   ├── config.ts    # Environment configuration
│   ├── db.ts        # Database connection
│   ├── logger.ts    # Logging utility
│   └── middleware.ts # Express middlewares
├── app.ts           # Express app setup
└── index.ts         # Application entry point
```

## Available Scripts

- `npm run build` - Compiles TypeScript to JavaScript
- `npm start` - Runs the compiled app in production mode
- `npm run dev` - Runs the app in development mode with hot reload
- `npm test` - Runs tests
- `npm run lint` - Lints the code
- `npm run lint:fix` - Lints and fixes the code
- `npm run format` - Formats the code with Prettier
- `npm run format:check` - Checks if code is properly formatted

## Error Handling

This project uses `express-async-errors` to automatically catch errors in async routes and pass them to the error handler middleware, eliminating the need for try-catch blocks in route handlers.

```typescript
// No need for try-catch in route handlers:
notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id); // This will be caught automatically if it fails
  // ...rest of the handler
});
```

## API Endpoints

### Notes

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get a single note
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## License

ISC