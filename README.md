# GovTech Assessment

This is a Unit Nukleus GovTech, Kem Digital Assessment for Software Developer roles.

This would be the entry point for all of my documentation.

## Introduction

This repositories serves as the Backend Services for this assessment. Although we are using Supabase which can act as BaaS (Back-End As a Service), I think it is important to have a custom backend to showcase my backend writing skills. Although there is still a lot can be improved but I think this is enough for the assessment.

## Documentation

### [Demo Link](https://nukleus-assessment.web3ramen.com/)

[API Url](https://nukleus-backend.onrender.com)

[Figma Documentation](https://www.figma.com/file/AE6vCE7lwxDaMI32c0nVWk/%5BFarhan%5D-GovTech-Assessment-Brainstorm-Board?type=whiteboard&t=ewtZZiMzR75Sc1k7-1)

[Migrations-Domain Repositories](https://github.com/paanjoe/nukleus-domain)

[Backend-Service Repositories](https://github.com/paanjoe/nukleus-backend)

[Frontend Repositories](https://github.com/paanjoe/nukleus-frontend)

[API Documentation](https://github.com/paanjoe/nukleus-backend/tree/main/test-cases)

## Tech Stack | Framework

#### Nukleus-Domain

- **ORM Framework:** PrismaORM
- **Serverless:** Supabase
- **Database Engine:** Postgre
- **CI/CD:** GitHub Actions --> Just a Migrations Checker is in sync with the Database

#### Nukleus-Backend

- **ORM Model:** PrismaORM
- **Backend Framework:** ExpressJS
- **Api Documentation:** Swagger
- **CI/CD:** GitHub Actions
- **Unit Test:** Jest & Supertest

#### Nukleus-Frontend

- **Framework:** React Next.JS
- **UI Kit** TailwindCSS
- **Infrastructure** Vercel

#### Deployment Infrastructure

- **Host for Backend:** Render.com
- **Host for Frontend:** Vercel.com
- **CI/CD:** GitHub Actions

## Environment Variables - Nukleus-Backend

To run this Nukleus Backend, you need this `.env` file in the root of the project. You can refer the .env.example file.

```
DATABASE_URL=xxx
PORT=xxx
JWT_SECRET=xxx
SUPABASE_ANON_KEY=xxx
SUPABASE_URL=xxx
USER_EMAIL=xxx
USER_PASSWORD=xxx
```

## Deployment | Command

To run this project locally. Please use the command below whenever makes sense:

Cloning this repositories:

```bash
  git clone https://github.com/paanjoe/nukleus-backend.git
```

Installing Packages

```bash
  npm i
```

Run the development server

```bash
  npm run dev
```

## Testing the endpoint

### Unit Test:

Simply run:

```bash
  npm run test
```

Result:

```
PASS  unit-test/inventory.test.ts
  Inventory API Tests
    ✓ GET /api/inventory returns 200 OK status (1247 ms)
    ✓ GET /api/inventory/:inventoryId returns 200 OK status (324 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        3.435 s
Ran all test suites.
```

To test this endpoint you can head over to API documentation swagger:

## License

[MIT License](https://choosealicense.com/licenses/mit/)
