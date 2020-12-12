import * as Yup from 'yup';

const schema = Yup.object().shape({
  postalCode: Yup.string().required(),
  name: Yup.string().required(),
  code: Yup.string().required(),
  value: Yup.number().required(),
  deadline: Yup.string().required(),
});

class CreateShipmentDataService {
  async execute(data: ShipmentData) {
    await schema.validate(data, {
      abortEarly: false,
    });

    const shipmentData = new ShipmentData(data);

    return shipmentData;
  }
}

class ShipmentData {
  postalCode: string;
  name: string;
  code: string;
  value: number;
  deadline: string;

  constructor(data: ShipmentData) {
    this.postalCode = data.postalCode;
    this.name = data.name;
    this.code = data.code;
    this.value = data.value;
    this.deadline = data.deadline;
  }
}

export default CreateShipmentDataService;
