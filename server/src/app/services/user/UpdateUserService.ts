import { getRepository } from 'typeorm';
import argon2 from 'argon2';
import * as Yup from 'yup';
import AppError from '../../errors/AppError';
import User from '../../models/User';

interface GivenUser {
  name?: string;
  email?: string;
  password?: string;
  birth_date?: string;
  contact_number?: string;
}

const schema = Yup.object().shape({
  name: Yup.string().max(120).min(3),
  email: Yup.string().email(),
  password: Yup.string().matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/), // Minimum eight characters, letter upper and lower case and numbers.
  birth_date: Yup.string().matches(
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  ), // yyyy-mm-dd
  contact_number: Yup.string().matches(
    /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
  ), // (xx) xxxxx-xxxx
});

class UpdateUserService {
  async execute(id: string, data: GivenUser) {
    const usersRepository = getRepository(User);

    const updatableFields = [
      'name',
      'email',
      'password',
      'birth_date',
      'contact_number',
    ];

    let updates = Object.keys(data);
    const isValidUpdate = updates.every(field =>
      updatableFields.includes(field)
    );

    if (!isValidUpdate) throw new AppError('Invalid updates');

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError('User not found', 404);

    if (updates.includes('password')) {
      const hashedPass = await argon2.hash(data.password as string);

      user['password'] = hashedPass;

      updates = updates.filter(key => key !== 'password');
    }

    updates.forEach(key => {
      user[key as 'name'] = data[key as 'name'] as string;
    });

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
