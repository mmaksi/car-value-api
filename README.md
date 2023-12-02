<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Notes on NestJS

Nest includes HTTP implementation: `Express.js` by default or `Fastify`.

When a request comes to the server, the server does these general steps:

1. Validate that the request contains the data: `Pipe`
2. Make sure the user is authenticated: `Guard`
3. Route the request to a function: `Controller`
4. Run business logic: `Service`
5. Access a database: `Repository`
6. Error handling: `Filters`
7. Add logic to the coming requests or outgoing responses: `Interceptors`

## Setting Up Automatic Validation

1. Tell Nest to use global validation
2. Create Data Transfer Object (DTO): a class that describes the different properties of incomin request body
3. Add validation rules to the class
4. Apply that class to the request handler

## Validation Pipe

1. `class-transformer` turns the body into an instance of the DTO class
2. `class-validator` validates the instance
3. if there are validation errors, respond immediately. Otherwise, provide the `body` to the request handler

## Services vs. Repositories

Services are classes that have business logic and its job is to find or store data by interacting with the repository

Repositories are TypeORM entities or Mongoose schemas that have database logic

## Inversion of Control Principle

Classes should not create instances of its dependencies on its own. They should receive their dependencies through the constructor. Why?

If we created a class that recives its dependency as a general class:

- In production, we can run the code as expected while writing to a real database
- During automated testing, we can run the code by passing a fake dependency that has the same class blueprint of the real dependency without writing to the production database

## Dependency Injection

We have an `Injector` or a `container` in which we register all the classes and their dependencies. Now the injector will create instances of any class we want without us explicitly instantiating its dependencies. The injector will do that for us.

1. At startup, register all classes with the container
2. Container will figure out what each dependency each class has
3. We ask the container to create an instance of a class for us
4. Container will create all required dependencies and gives us the instance
5. Container will hold on the created dependency instances and reuse them if needed

### DI inside of a module

1. Add `@Injectable` decorator
2. Add the injected dependency to the `providers` list inside the module
3. Define the constructor method on any class that depends on the injected instance

### DI between modules

1. Add injected dependency to the `exports` list
2. Add the module X into module Y and add it to the list of `imports`

## Tips

Use `this.repo.create()` before `this.repo.save(user)` and don't use the `save()` or `remove()` methods alone.

One scenario where creating an entity instance before saving it is beneficila is if we want to use `hooks` inside the entity class. Those hooks will be executed only if an instance was created or updated or deleted. Always create an entity instance before performing CRUD operations.

When an interceptor is defined through a decorator on a controller, the interceptor's class will be instantiated on every request to that controller. So you have to inject the interceptor into the DI system by the `@Injectable()` decorator.

To access the logged-in user on every request made to a certain controller by a custom decorator, create an interceptor that uses the user's session object to attach the user object to the `request` object that can be consumed by a custom param decrorator because the param decorator cannot tap into the services directly.

When fetching a user from the DB, the asscoication with the Report table is not fetched auatomatically.
