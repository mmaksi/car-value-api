console.log(`Runnin NestJS server in the ${process.env.NODE_ENV} environment`);

const dbConfig = {
  // migrations: ['migration/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      database: 'car-value-db',
      username: 'mark',
      password: 'pass123',
      autoLoadEntities: true,
      synchronize: true,
    });
    break;
  case 'development':
    // Object.assign(dbConfig, {
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: ['**/*.entity.js'],
    // });
    Object.assign(dbConfig, {
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      database: 'car-value-db',
      username: 'mark',
      password: 'pass123',
      autoLoadEntities: true,
      synchronize: true,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
  default:
    throw new Error('Unknown environment');
}

module.exports = dbConfig;
