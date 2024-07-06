import { DataSource } from 'typeorm';
import * as path from 'path';
import { User } from './entity/User';

const dbPath = path.join(__dirname, '..', 'db.sqlite3')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  synchronize: true,
  entities: [User],
});

export const initDataSource = async () => {
  await AppDataSource.initialize();
  console.log('db connected and initialized');
};

initDataSource().catch((err) => console.log('db error:', err));
