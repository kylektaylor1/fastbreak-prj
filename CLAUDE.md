# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Build: `pnpm build`
- Dev: `pnpm dev`
- Lint: `pnpm lint`
- Database:
    - Generate migrations: `pnpm db:generate`
    - Run migrations: `pnpm db:migrate`
    - Seed database: `pnpm db:seed`
    - Reset database: `pnpm db:mint`

## Code Style

- TypeScript: Use strict types and prefer type imports (`import type { X } from 'y'`)
- React: Use functional components with TypeScript
- Imports: Use absolute imports with `@/` alias for src directory
- Naming:
    - Components: PascalCase (Button)
    - Utilities/hooks: camelCase
    - Files: kebab-case (nav-bar.tsx)
- Formatting:
    - Single quotes
    - 4-space tabs
    - 80 character line limit
    - Semicolons required
- Styling: Use Tailwind with `cn()` utility for class merging
- Error handling: Use try/catch in API routes with appropriate status codes
