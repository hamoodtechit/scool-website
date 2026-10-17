# Next.js Enterprise Boilerplate

A highly scalable, production-ready Next.js 15 boilerplate designed for enterprise applications, ERPs, and portfolios. It comes pre-configured with a modern data layer, modular database schemas, strict type safety, and optimized Docker deployment.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) (English & Arabic RTL support)
- **Database (ORM)**: [Prisma](https://www.prisma.io/) (Configured for multi-file schemas)
- **Data Fetching**: [Axios](https://axios-http.com/) + [@tanstack/react-query](https://tanstack.com/query/latest)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Validation**: [Zod](https://zod.dev/)
- **Code Quality**: Husky, Lint-Staged, Prettier
- **Deployment**: Multi-stage Dockerfile (Standalone Output)

---

## 📁 Project Architecture

This boilerplate strictly separates concerns to ensure massive scalability:

```text
src/
├── app/                  # Next.js App Router (pages, layouts, api routes)
├── components/           # Reusable UI components (Shadcn, generic UI)
├── hooks/api/            # React Query hooks (e.g. useGetLead)
├── i18n/                 # Internationalization configurations
├── lib/                  # Singletons and utilities (api.ts, prisma.ts)
├── schemas/              # Zod validation schemas (shared across frontend/backend)
├── services/             # Raw Axios API calls (No React logic here!)
├── store/                # Zustand global state slices
├── types/                # Global TypeScript definitions
├── utils/                # Helper functions (error parsing, formatting)
└── env.ts                # Strict environment variable validation
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
This project uses `pnpm` for fast and strict dependency management.
```bash
pnpm install
```

### 2. Environment Variables
Copy the `.env.example` file to `.env` and configure your variables. The application will crash on boot if required variables in `src/env.ts` are missing.
```bash
cp .env.example .env
```

### 3. Database Setup (Prisma)
This project uses the Prisma `prismaSchemaFolder` feature. All database models are split into multiple files inside `prisma/schema/`.

Apply the database schema and generate the client:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Architectural Patterns

### API Fetching
Do not put `axios` calls directly inside React components. 
1. Define the raw network request in `src/services/your-feature.service.ts`.
2. Wrap that service call in a React Query hook inside `src/hooks/api/your-feature/use-your-feature.ts`.
3. Keep cache keys co-located in `your-feature.keys.ts`.
4. Call the hook in your UI component. All loading, caching, and toast notifications will be handled automatically!

### Error Handling
Always use the `extractErrorMessage()` utility from `src/utils/error.ts` when catching errors. It automatically parses backend Axios errors, Zod validation errors, and standard JS errors into clean, user-friendly strings.

---

## 🐳 Docker Deployment

This project is configured with a highly optimized multi-stage Dockerfile leveraging Next.js `standalone` output. The final image size is drastically reduced for production.

Build the image:
```bash
docker build -t nextjs-enterprise-app .
```

Run the container:
```bash
docker run -p 3000:3000 --env-file .env nextjs-enterprise-app
```
