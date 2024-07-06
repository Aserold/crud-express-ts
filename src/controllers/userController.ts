import { User } from '../db/entity/User';
import { AppDataSource } from '../db/data-source';

const userRepository = AppDataSource.getRepository(User);

type userType = {
  name: string;
  age: number;
};

const createUser = async (user: userType) => {
  const newUser = userRepository.create(user);
  await userRepository.save(newUser);
  return newUser;
};

const listUsers = async () => {
  try {
    const users = await userRepository.find();
    return users;
  } catch (err) {
    return [];
  }
};

const getUser = async (id: number) => {
  const user = await userRepository.findOneBy({ id });
  return user;
};

const updateUser = async (id: number, updatedData: userType) => {
  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error('User not found.');
  }
  userRepository.merge(user, updatedData);
  await userRepository.save(user);
  return user;
};

const deleteUser = async (id: number) => {
  const result = await userRepository.delete(id);
  return (result.affected ?? 0) > 0;
};

export { createUser, listUsers, getUser, updateUser, deleteUser };
