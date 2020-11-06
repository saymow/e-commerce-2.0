import * as Yup from 'yup';
import argon2 from 'argon2';
import { getRepository } from 'typeorm';
import User from '../../models/User';

interface GivenUser {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  contact_number: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required().max(120).min(3),
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/), // Minimum eight characters, letter upper and lower case and numbers.
  birth_date: Yup.string()
    .required()
    .matches(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/), // yyyy-mm-dd
  contact_number: Yup.string()
    .required()
    .matches(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/), // (xx) xxxxx-xxxx
});

class CreateUserService {
  async execute(data: GivenUser): Promise<User> {
    const usersRepository = getRepository(User);

    await schema.validate(data, {
      abortEarly: false,
    });

    const { name, email, birth_date, contact_number, password } = data;

    const hashedPass = await argon2.hash(password);

    const user = usersRepository.create({
      name,
      email,
      birth_date,
      contact_number,
      password: hashedPass,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
