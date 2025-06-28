# ESLint Configuration

This workspace has been configured with ESLint for both the frontend and backend projects.

## Backend ESLint Configuration

Located at `backend/.eslintrc.json`:
- Uses `@typescript-eslint/parser` for TypeScript support
- Includes basic ESLint recommended rules
- Configured for Node.js environment
- Uses double quotes, semicolons, and 2-space indentation

## Frontend ESLint Configuration

Located in `frontend/package.json` under `eslintConfig`:
- Extends React App's ESLint configuration
- Uses `@typescript-eslint/parser` for TypeScript support
- Includes TypeScript-specific rules
- Configured for browser environment

## Usage

### Lint Backend Only
```bash
npm run lint:backend
```

### Lint Frontend Only
```bash
npm run lint:frontend
```

### Lint Both Projects
```bash
npm run lint:all
```

### Auto-fix Issues
```bash
npm run lint:fix:backend  # Backend only
npm run lint:fix:frontend # Frontend only
```

## Notes

- ESLint v8 is used for compatibility with existing configurations
- TypeScript version warnings can be safely ignored as the configuration works correctly
- The linting passes indicate no code style or syntax errors in the current codebase
