# Arbitrum Security Council Monorepo

This is a monorepo containing the Arbitrum Security Council application with both backend and frontend packages.

## Structure

```
arb-sec-council/
├── back/           # Backend (Ponder indexer)
├── front/          # Frontend (Next.js app)
├── package.json    # Root package.json with workspace scripts
└── pnpm-workspace.yaml  # Workspace configuration
```

## Prerequisites

- Node.js >= 18.14
- pnpm >= 8.0.0

## Installation

Install all dependencies from the root:

```bash
pnpm install
```

## Development

### Run both backend and frontend in parallel:
```bash
pnpm dev
```

### Run individual services:
```bash
# Backend only
pnpm run back:dev

# Frontend only  
pnpm run front:dev
```

### Build commands:
```bash
# Build both
pnpm run build

# Build individual services
pnpm run back:build
pnpm run front:build
```

### Production:
```bash
# Start both in production
pnpm run start

# Start individual services
pnpm run back:start
pnpm run front:start
```

### Linting and Type Checking:
```bash
# Lint all packages
pnpm run lint

# Type check all packages
pnpm run typecheck

# Individual package commands
pnpm run back:lint
pnpm run front:lint
pnpm run back:typecheck
pnpm run front:typecheck
```

### Clean build artifacts:
```bash
pnpm run clean
```

## Package Management

- All dependencies are managed from the root
- Use `pnpm add <package>` to add dependencies to the root
- Use `pnpm add <package> --filter backend` to add to backend only
- Use `pnpm add <package> --filter frontend` to add to frontend only

## Workspace Commands

You can run any script in any package using:
```bash
pnpm --filter <package-name> <script>
```

Examples:
- `pnpm --filter backend db` - Run database commands
- `pnpm --filter backend codegen` - Generate code for backend
- `pnpm --filter frontend build` - Build frontend only
