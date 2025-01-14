import omit from 'lodash/omit';
import { User } from '@/entities/User';
import { AddUserInput, SignInInput } from '@/types/users.types';

export function findAll(email?: string): Promise<User[]> {
  if (!email) return User.find();
  return User.find({
    where: {
      email,
    },
  });
}

export function findOne(userCredentials: SignInInput): Promise<User | null> {
  const user = new User();
  Object.assign(user, omit(userCredentials, 'password'));
  return User.findOne({
    where: {
      email: user.email,
      hashedPassword: user.hashedPassword,
    },
  });
}

export function findOneById(userId: number): Promise<User | null> {
  return User.findOne({
    where: { id: userId },
  });
}

export function findOneByEmail(email: string): Promise<User | null> {
  return User.findOne({
    where: { email },
  });
}

export function create(newUserContent: AddUserInput): Promise<User> {
  const newUser = new User();
  Object.assign(newUser, omit(newUserContent, 'password'));
  return newUser.save();
}
