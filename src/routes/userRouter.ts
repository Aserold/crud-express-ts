import express from 'express';
import { validate } from '../middlewares/userMiddlewares';
import { userSchema } from '../schemas/userSchemas';
import * as userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/users', (req, res) => {
  const users = userController.listUsers();
  res.send(users);
});

userRouter.post('/users', validate(userSchema), (req, res) => {
  const { name, age } = req.body;
  res.send(userController.createUser({ name, age }))
});

userRouter.get('/users/:id(\\d+)', userController.getUser);

userRouter.put('/users/:id(\\d+)', validate(userSchema), (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    userController.updateUser(+id, { name, age });
  } catch (err) {
    res.status(404).send({ message: 'User not found.' });
  }
});

userRouter.delete('/users/:id(\\d+)', async (req, res) => {
  const { id } = req.params;
  const result = await userController.deleteUser(+id);
  if (!result) {
    res.status(404).send({ message: 'User not found.' });
  } else {
    res.status(204);
  }
});

export default userRouter;
