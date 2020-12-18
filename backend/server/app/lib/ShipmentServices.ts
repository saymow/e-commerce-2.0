import { calcularPrecoPrazo, consultarCep } from 'correios-brasil';

let args = {
  // sCepDestino: string;
  // nCdServico: string; // SEDEX/PAC

  sCepOrigem: '03937-087', // https://www.4devs.com.br/gerador_de_cep
  nVlPeso: 0.8, // In KG.
  nCdFormato: 1, //1 = Formato caixa/pacote 2 = Formato rolo/prisma 3 = Envelope
  nVlComprimento: 20, // decimal
  nVlAltura: 15, //decimail
  nVlLargura: 15, //decimail
};

class ShipmentServices {
  async getShipmentData(postalCode: string, serviceCode: string) {
    const { '0': shipmentData } = await calcularPrecoPrazo(
      Object.assign(args, {
        sCepDestino: postalCode,
        nCdServico: [serviceCode],
      })
    );

    const formmatedShipmentData = {
      name: shipmentData.Codigo,
      value: shipmentData.Valor,
      code: shipmentData.Codigo,
      deadline: shipmentData.PrazoEntrega,
    };

    return formmatedShipmentData;
  }

  async getAddressData(postalCode: string) {
    const addressData = await consultarCep(postalCode);

    const formattedShipmentData = {
      state: addressData.uf,
      city: addressData.localidade,
      neighborhood: addressData.bairro,
      postal_code: addressData.cep,
      street: addressData.logradouro,
    };

    return formattedShipmentData;
  }
}

export default ShipmentServices;
