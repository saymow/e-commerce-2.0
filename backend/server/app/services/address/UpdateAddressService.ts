import * as Yup from 'yup';
import { getRepository } from 'typeorm';
import Address from '../../models/Address';
import AppError from '../../errors/AppError';

interface GivenAddress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  postal_code: string;
  number: string;
}

const schema = Yup.object().shape({
  state: Yup.string().length(2),
  city: Yup.string(),
  neighborhood: Yup.string(),
  street: Yup.string(),
  postal_code: Yup.string(),
  // .matches(/5{\d}-3{\d}/), //format 99999-999
  number: Yup.string().max(4),
});

class UpdateAddressService {
  async execute(data: GivenAddress, userId: string, addressId: string) {
    const addressesRepository = getRepository(Address);

    await schema.validate(data, {
      abortEarly: false,
    });

    const address = await addressesRepository.findOne(addressId);

    if (!address) throw new AppError('Address not found');

    for (const key in data) {
      (address as any)[key] = (data as any)[key];
    }

    await addressesRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;
