import { Request, Response } from 'express';

import Address from '../models/Address';
import { getRepository } from 'typeorm';
import CreateAddressService from '@services/address/CreateAddressService';
import UpdateAddressService from '@services/address/UpdateAddressService';

class AddressController {
  async create(req: Request, res: Response) {
    const createAddressService = new CreateAddressService();

    const userId = req.session!.user.id;

    const { state, city, neighborhood, street, postal_code, number } = req.body;

    const address = await createAddressService.execute(
      {
        state,
        city,
        neighborhood,
        street,
        postal_code,
        number,
      },
      userId
    );

    return res.status(201).send(address);
  }

  async index(req: Request, res: Response) {
    const addressesRepository = getRepository(Address);

    const userId = req.session!.user.id;

    const addresses = await addressesRepository.find({
      where: { user_id: userId },
    });

    return res.send(addresses);
  }

  async show(req: Request, res: Response) {
    const addressesRepository = getRepository(Address);

    const userId = req.session!.user.id;
    const addressId = req.params.id;

    const address = await addressesRepository.findOne({
      where: { user_id: userId, id: addressId },
    });

    return res.send(address);
  }

  async update(req: Request, res: Response) {
    const updateAddressService = new UpdateAddressService();

    const addressId = req.params.id;
    const userId = req.session!.user.id;

    const data = req.body;

    const address = await updateAddressService.execute(data, userId, addressId);

    return res.send(address);
  }

  async destory(req: Request, res: Response) {
    const addressesRepository = getRepository(Address);

    const addressId = req.params.id;
    const userId = req.session!.user.id;

    await addressesRepository.delete({ id: addressId, user_id: userId });

    return res.send();
  }
}

export default AddressController;
