<h1 align="center">Express Typescript Boilerplate</h1>

## ❯ Why

The goal with this project is an enterprise ready feature complete server application with all necessary project configuration.

### Features

- **Annotation driven Code**
- **Dependency Injection** with [TypeDI](https://github.com/pleerock/typedi)
- **Simplified Database Query** with [TypeORM](https://github.com/typeorm/typeorm)
- **Clear Structure**
- **Easy Exception Handling** with [routing-controllers](https://github.com/pleerock/routing-controllers)
- **Smart Validation** with [class-validator](https://github.com/pleerock/class-validator)
- **Custom Validators** with [custom-validation-classes](https://github.com/pleerock/class-validator#custom-validation-classes)
- **API Documentation** with [swagger](http://swagger.io/) and [routing-controllers-openapi](https://github.com/epiphone/routing-controllers-openapi)
- **Easy API Testing**
- **Integrated Testing** with [Jest](https://facebook.github.io/jest)
- **E2E API Testing** with [supertest](https://github.com/visionmedia/supertest)
- **Basic Security Features** with [Helmet](https://helmetjs.github.io/)
- **Fast Database Building** with simple migration from [TypeORM](https://github.com/typeorm/typeorm)
- **Easy Data Seeding** with our own factories
- **TypeGraphQL** with [TypeGraphQL](https://19majkel94.github.io/type-graphql/). Enables code first GraphQL
- **DataLoaders** helps with performance with caching and batching [DataLoaders](https://github.com/facebook/dataloader)

---

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Debugger in VSCode](#-debugger-in-vscode)
- [API Routes](#-api-routes)
- [Project Structure](#-project-structure)
- [Logging](#-logging)
- [Seeding](#-seeding)
- [GraphQL](#-graph-q-l)
- [Further Documentations](#-further-documentations)
- [License](#-license)

---

## ❯ Getting Started

### Step 1: Set up the Development Environment

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install Postgres database.

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.

```bash
npm run setup
```

> This installs all dependencies with yarn. After that it migrates the database and seeds some test data into it. So after that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
npm start serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the sever according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

---

## ❯ Scripts and Tasks

All script are defined in the `package-scripts.js` file, but the most important ones are listed here.

### Install

- Install all dependencies with `npm install`

### Linting

- Run code quality analysis using `npm start lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `npm start test` (There is also a vscode task for this called `test`).
- Run the integration tests using `npm start test.integration`.
- Run the e2e tests using `npm start test.e2e`.

### Running in dev mode

- Run `npm start serve` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `npm start build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `npm start`.

### Database Migration

- Run `typeorm migration:create -n <migration-file-name>` to create a new migration file.
- Try `typeorm -h` to see more useful cli commands like generating migration out of your models.
- To migrate your database run `npm start db.migrate`.
- To revert your latest migration run `npm start db.revert`.
- Drops the complete database schema `npm start db.drop`.

### Database Seeding

- Run `npm start db.seed` to seed your seeds into the database.

---

## ❯ API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| **/api**       | Shows us the name, description and the version of the package.json |
| **/graphql**   | Route to the graphql editor or your query/mutations requests       |
| **/swagger**   | This is the Swagger UI with our API documentation                  |
| **/api/users** | Example entity endpoint                                            |
| **/api/pets**  | Example entity endpoint                                            |

---

## ❯ Project Structure

| Name                              | Description                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| **dist/**                         | Compiled source files will be placed here                                                        |
| **src/**                          | Source files                                                                                     |
| **src/api/controllers/**          | REST API Controllers                                                                             |
| **src/api/controllers/requests**  | Request classes with validation rules if the body is not equal with a model                      |
| **src/api/controllers/responses** | Response classes or interfaces to type json response bodies                                      |
| **src/api/errors/**               | Custom HttpErrors like 404 NotFound                                                              |
| **src/api/interceptors/**         | Interceptors are used to change or replace the data returned to the client.                      |
| **src/api/middlewares/**          | Express Middlewares like helmet security features                                                |
| **src/api/models/**               | TypeORM Models                                                                                   |
| **src/api/repositories/**         | Repository / DB layer                                                                            |
| **src/api/services/**             | Service layer                                                                                    |
| **src/api/subscribers/**          | Event subscribers                                                                                |
| **src/api/validators/**           | Custom validators, which can be used in the request classes                                      |
| **src/api/resolvers/**            | GraphQL resolvers (query, mutation & field-resolver)                                             |
| **src/api/types/**                | GraphQL types ,input-types and scalar types                                                      |
| **src/api/** schema.gql           | Generated GraphQL schema                                                                         |
| **src/auth/**                     | Authentication checkers and services                                                             |
| **src/core/**                     | The core features like logger and env variables                                                  |
| **src/database/factories**        | Factory the generate fake entities                                                               |
| **src/database/migrations**       | Database migration scripts                                                                       |
| **src/database/seeds**            | Seeds to create some data in the database                                                        |
| **src/decorators/**               | Custom decorators like @Logger & @EventDispatch                                                  |
| **src/loaders/**                  | Loader is a place where you can configure your app                                               |
| **src/public/**                   | Static assets (fonts, css, js, img).                                                             |
| **src/types/** \*.d.ts            | Custom type definitions and files that aren't on DefinitelyTyped                                 |
| **test**                          | Tests                                                                                            |
| **test/e2e/** \*.test.ts          | End-2-End tests (like e2e)                                                                       |
| **test/integration/** \*.test.ts  | Integration test with SQLite3                                                                    |
| **test/unit/** \*.test.ts         | Unit tests                                                                                       |
| .env.example                      | Environment configurations                                                                       |
| .env.test                         | Test environment configurations                                                                  |
| mydb.sql                          | SQLite database for integration tests. Ignored by git and only available after integration tests |

---

## ❯ Logging

Our logger is [winston](https://github.com/winstonjs/winston). To log http request we use the express middleware [morgan](https://github.com/expressjs/morgan).
We created a simple annotation to inject the logger in your service (see example below).

```typescript
import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class UserService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    ...
```

---

## ❯ Seeding

How does it work? Create a factory for your entities (models) and a seed script.

### 1. Create a factory for your entity

For all entities we want to seed, we need to define a factory. To do so we give you the awesome [faker](https://github.com/marak/Faker.js/) library as a parameter into your factory. Then create your "fake" entity and return it. Those factory files should be in the `src/database/factories` folder and suffixed with `Factory` like `src/database/factories/UserFactory.ts`.

Settings can be used to pass some static value into the factory.

```typescript
define(User, (faker: typeof Faker, settings: { roles: string[] }) => {
  const gender = faker.random.number(1)
  const firstName = faker.name.firstName(gender)
  const lastName = faker.name.lastName(gender)
  const email = faker.internet.email(firstName, lastName)

  const user = new User()
  user.firstName = firstName
  user.lastName = lastName
  user.email = email
  user.roles = settings.roles
  return user
})
```

Handle relation in the entity factory like this.

```typescript
define(Pet, (faker: typeof Faker, settings: undefined) => {
  const gender = faker.random.number(1)
  const name = faker.name.firstName(gender)

  const pet = new Pet()
  pet.name = name
  pet.age = faker.random.number()
  pet.user = factory(User)({ roles: ['admin'] })
  return pet
})
```

### 2. Create a seed file

The seeds files define how much and how the data are connected with each other. The files will be executed alphabetically.
With the second function, accepting your settings defined in the factories, you are able to create different variations of entities.

```typescript
export class CreateUsers implements Seed {
  public async seed(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)({ roles: [] }).createMany(10)
  }
}
```

Here an example with nested factories. You can use the `.map()` function to alter
the generated value before they get persisted.

```typescript
...
await factory(User)()
    .map(async (user: User) => {
        const pets: Pet[] = await factory(Pet)().createMany(2);
        const petIds = pets.map((pet: Pet) => pet.Id);
        await user.pets().attach(petIds);
    })
    .createMany(5);
...
```

To deal with relations you can use the entity manager like this.

```typescript
export class CreatePets implements SeedsInterface {
  public async seed(
    factory: FactoryInterface,
    connection: Connection
  ): Promise<any> {
    const connection = await factory.getConnection()
    const em = connection.createEntityManager()

    await times(10, async n => {
      // This creates a pet in the database
      const pet = await factory(Pet)().create()
      // This only returns a entity with fake data
      const user = await factory(User)().make()
      user.pets = [pet]
      await em.save(user)
    })
  }
}
```

### 3. Run the seeder

The last step is the easiest, just hit the following command in your terminal, but be sure you are in the projects root folder.

```bash
npm start db.seed
```

#### CLI Interface

| Command                                             | Description                                                         |
| --------------------------------------------------- | ------------------------------------------------------------------- |
| `npm start "db.seed"`                              | Run all seeds                                                       |
| `npm start "db.seed -L"`                           | Log database queries to the terminal                                |
| `npm start "db.seed --factories <path>"`           | Add a different path to your factories (Default: `src/database/`)   |
| `npm start "db.seed --seeds <path>"`               | Add a different path to your seeds (Default: `src/database/seeds/`) |

---

## ❯ GraphQL

For the GraphQL part we used the library [TypeGraphQL](https://19majkel94.github.io/type-graphql/) to build GraphQL API's.

The context(shown below) of the GraphQL is builded in the **graphqlLoader.ts** file. Inside of this loader we create a scoped container for each incoming request.

```typescript
export interface Context {
  requestId: number
  request: express.Request
  response: express.Response
  container: ContainerInstance
}
```

### DataLoader

For the usage of the DataLoaders we created a annotation, which automatically creates and registers a new DataLoader to the scoped container.

Here is an example of the **PetResolver**.

```typescript
import DataLoader from 'dataloader';
import { DLoader } from '../../decorators/DLoader';
    ...
    constructor(
        private petService: PetService,
        @Logger(__filename) private log: LoggerInterface,
        @DLoader(UserModel) private userLoader: DataLoader<string, UserModel>
    ) { }
    ...
```

Or you could use the repository too.

```typescript
@DLoader(UserRepository) private userLoader: DataLoader<string, UserModel>
```

Or even use a custom method of your given repository.

```typescript
@DLoader(PetRepository, {
    method: 'findByUserIds',
    key: 'userId',
    multiple: true,
}) private petLoader: DataLoader<string, PetModel>
```

---

## ❯ Further Documentations

| Name & Link                                                                                | Description                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Express](https://expressjs.com/)                                                          | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.                                                                    |
| [Microframework](https://github.com/pleerock/microframework)                               | Microframework is a simple tool that allows you to execute your modules in a proper order, helping you to organize bootstrap code in your application.                                                         |
| [TypeDI](https://github.com/pleerock/typedi)                                               | Dependency Injection for TypeScript.                                                                                                                                                                           |
| [routing-controllers](https://github.com/pleerock/routing-controllers)                     | Create structured, declarative and beautifully organized class-based controllers with heavy decorators usage in Express / Koa using TypeScript and Routing Controllers Framework.                              |
| [TypeORM](http://typeorm.io/#/)                                                            | TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework.                                                                                                                  |
| [class-validator](https://github.com/pleerock/class-validator)                             | Validation made easy using TypeScript decorators.                                                                                                                                                              |
| [class-transformer](https://github.com/pleerock/class-transformer)                         | Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors                                                                                      |
|  [event-dispatcher](https://github.com/pleerock/event-dispatch)                            | Dispatching and listening for application events in Typescript                                                                                                                                                 |
|  [Helmet](https://helmetjs.github.io/)                                                     | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!                                                                                          |
|  [Auth0 API Documentation](https://auth0.com/docs/api/management/v2)                       | Authentification service                                                                                                                                                                                       |
|  [Jest](http://facebook.github.io/jest/)                                                   | Delightful JavaScript Testing Library for unit and e2e tests                                                                                                                                                   |
|  [supertest](https://github.com/visionmedia/supertest)                                     | Super-agent driven library for testing node.js HTTP servers using a fluent API                                                                                                                                 |
|  [nock](https://github.com/node-nock/nock)                                                 | HTTP mocking and expectations library                                                                                                                                                                          |
| [swagger Documentation](http://swagger.io/)                                                |  API Tool to describe and document your api.                                                                                                                                                                   |
| [SQLite Documentation](https://www.sitepoint.com/getting-started-sqlite3-basic-commands/)  | Getting Started with SQLite3 – Basic Commands.                                                                                                                                                                 |
| [GraphQL Documentation](http://graphql.org/graphql-js/)                                    | A query language for your API.                                                                                                                                                                                 |
| [DataLoader Documentation](https://github.com/facebook/dataloader)                         | DataLoader is a generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching. |

---

## ❯ License

[MIT](/LICENSE)
