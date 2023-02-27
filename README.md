# DNPL Full Stack Technical Test

DNPL is a platform for helping users pay off their debts.

Your challenge is to create a solve a small portion of this problem by taking this barebones repository and creating the following:

- A NestJS REST api that can store a read, create, update and delete from a list of creditors for a user

  - A creditor should have the following information.
    - id
    - name
    - address
    - email
    - phone
  - A user should have the following information
    - id,
    - first_name
    - last_name
    - email
  - You should also be able to store the amount_owed to a creditor for each user
  - Suggested libraries you should consider include [TypeORM](https://typeorm.io/) and [NestJS Swagger](https://docs.nestjs.com/openapi/introduction)

- A NextJS application that can select a user from a dropdown and then see a list of their creditors including amount_owed to each
  - The frontend doesn't need to be pretty but should be easy to use
  - Please use Tailwind CSS for styling. Any custom config should be placed in `tailwind-workspace-preset.js`
  - Other suggested libraries include [Tanstack React Query](https://tanstack.com/query/latest) and [React Hook Form](https://react-hook-form.com/)

#### Things to consider

- No login or authentication required
- Unit and Integration tests are recommended for core business logic
- You can use any additional libraries or tools you like but be prepared to explain your choices in your interview
- Your api should have some documentation, NestJS swagger recommended
- You can use any database you like but we recommend sqlite so it's easy to include your DB in your repo and you can skip adding migrations
- Your finished solution should contain a readme with instructions for easy setup
- You may store any secrets directly in your repository (even though you wouldn't do this in production)
- All unit and e2e tests should pass on your completed solution
- You should spend no longer than four hours on your solution. Please only submit whatever you can achieve in that time.

## Installation

### Fork the repository

Please first fork this repository to your own GitHub account and then check it out like below but with your own details.

```bash
git clone git@github.com:dnplco/full-stack-tech-test.git
```

### Prerequisites

- You should have [Node](https://nodejs.org/en/download/) running locally on your machine
- There may be other requirements. Please reach out to us if you have difficulties getting the application running locally

### Install dependencies

You will need to use pnpm to run this monorepo. You can find installation instructions [here](https://pnpm.io/installation).

```bash
pnpm install
```

### Setup environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

## Usage

### Starting the platform

```bash
pnpm run start
```

While running the api will be available at `http://localhost:3333`
While running the website will be available at `http://localhost:3000`

### Testing the platform

```bash
# Unit Tests
pnpm nx test

# Integration Tests
pnpm nx e2e
```

### Building the platform

```bash
pnpm nx build
```

### Linting the platform

```bash
pnpm nx lint
```
