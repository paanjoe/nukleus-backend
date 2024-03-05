# GovTech Assessment

This is a Unit Nukleus GovTech, Kem Digital Assessment for Software Developer roles.

This would be the entry point for all of my documentation.

## Introduction

This repositories serves as the Backend Services for this assessment. Although we are using Supabase which can act as BaaS (Back-End As a Service), I think it is important to have a custom backend to showcase my backend writing skills. Although there is still a lot can be improved but I think this is enough for the assessment.

## Todo

- [/] Contact Endpoint
- [/] Roles Endpoint
- [/] User Endpoint
- [] Product Category Endpoint
- [] Product Media Endpoint
- [] Product Endpoint
- [] Inventory Endpoint

## Documentation

### [Demo Link](#)

[API Url](https://nukleus-backend.onrender.com)

[Figma Documentation](https://www.figma.com/file/AE6vCE7lwxDaMI32c0nVWk/%5BFarhan%5D-GovTech-Assessment-Brainstorm-Board?type=whiteboard&t=ewtZZiMzR75Sc1k7-1)

[Migrations-Domain Repositories](https://github.com/paanjoe/nukleus-domain)

[Backend-Service Repositories](https://github.com/paanjoe/nukleus-backend)

[Frontend Repositories](#)

[API Documentation](#)

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
- **Unit Test:** xxx

#### Nukleus-Frontend

- **xxx:** xxx

#### Deployment Infrastructure

- **Host for Backend:** Render.com
- **Host for Frontend:** xxx
- **CI/CD:** GitHub Actions

## Environment Variables - Nukleus-Backend

To run this Nukleus Domain, you need this `.env` file in the root of the project. You can refer the .env.example file.

```
DATABASE_URL=xxxxxxxxxxxxxxxxxx
PORT=xxxxxxxxxxxxxxxxxx
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

To test this endpoint you can head over to API documentation swagger:

[Swagger Url](#)
[Api Url](https://nukleus-backend.onrender.com)

Or if you're lazy to do that, simply head over to `./test-cases/{filename}.rest` and run the test cases by using the `Rest Client` extension in VSCode. You would be able to send the request and get the results stated in the file.

## License

[MIT License](https://choosealicense.com/licenses/mit/)
