# Fastbreak NBA Dashboard

Fastbreak is a Next.js application that provides users with a personalized NBA statistics viewing experience. The app allows users to browse team and player stats, view detailed analytics through interactive charts, and maintain a list of favorite teams.

## Key Features

- **Team and Player Stats**: View comprehensive NBA statistics including wins, losses, scoring percentages, and performance metrics
- **Interactive Charts**: Visualize team performance with charts for points per game and shooting percentages
- **Favorites System**: Save your favorite teams and players for quick access

## Authentication

The application uses Auth0 for secure authentication with the following features:

- **User Sessions**: Secure session management through Auth0's NextJS integration
- **Protected Routes**: Dashboard and API routes are protected and require authentication
- **Middleware Protection**: All non-static routes are guarded by Auth0 middleware
- **API Security**: Backend endpoints validate user sessions before allowing data modification
- **User-Specific Data**: Favorites and personalized views are tied to the authenticated user's identity

## Technology Stack

- **Frontend**: Next.js with React and TypeScript
- **Styling**: Tailwind CSS with the `cn()` utility for class merging
- **Database**: SQLite with Drizzle ORM
- **Authentication**: Auth0
- **Charting**: Interactive data visualization components

## Getting Started

First, run the development server:

```bash
# Install dependencies
pnpm install

# Set up the database
pnpm db:migrate
pnpm db:seed

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Database Commands

- Generate migrations: `pnpm db:generate`
- Run migrations: `pnpm db:migrate`
- Seed database: `pnpm db:seed`
- Reset database: `pnpm db:mint`

## Build and Deploy

```bash
# Build for production
pnpm build

# Run production build
pnpm start
```

