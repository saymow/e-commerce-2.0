import * as Yup from 'yup';
import { getRepository } from 'typeorm';
import Address from '../../models/Address';
import User from '../../models/User';
import AppError from '../../errors/AppError';

export interface AddressData {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postal_code: string;
  number: string;
}

export const schema = Yup.object().shape({
  state: Yup.string().required().length(2),
  city: Yup.string().required(),
  neighborhood: Yup.string().required(),
  street: Yup.string().required(),
  postal_code: Yup.string()
    .required()
    .matches(/(\d{5})(-{1})(\d{3})/, 'Invalid format'),
  // .matches(/5{\d}-3{\d}/), //format 99999-999
  number: Yup.string().required().max(4),
});

class CreateAddressService {
  async execute(data: AddressData, userId: string) {
    const addressesRepository = getRepository(Address);
    const usersRepository = getRepository(User);

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = await usersRepository.findOne(userId, {
      relations: ['addresses'],
    });

    if (!user) throw new AppError('User not found', 404);

    const { city, state, neighborhood, street, postal_code, number } = data;

    if (user.addresses.length >= 9)
      throw new AppError('Too many addresess registered, you must delete one.');

    const address = addressesRepository.create({
      user_id: user.id,
      city,
      state,
      neighborhood,
      street,
      postal_code,
      number,
    });

    await addressesRepository.save(address);

    return address;
  }
}

export default CreateAddressService;
