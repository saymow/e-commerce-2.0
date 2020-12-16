import AppError from '../errors/AppError';
import { calcularPrecoPrazo } from 'correios-brasil';
import { shippingServicePriceFormmater } from '../utils/servicesFormatters';

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

class CorreiosServiceValidatorService {
  async execute(
    sCepDestino: string,
    nCdServico: string,
    supposedPrice: number
  ) {
    const shipmentTrustedData = await calcularPrecoPrazo(
      Object.assign(args, { sCepDestino, nCdServico: [nCdServico] })
    );

    const realPrice = shippingServicePriceFormmater(
      shipmentTrustedData['0'].Valor
    );

    if (realPrice !== supposedPrice)
      throw new AppError('Invalid checkout data');
  }
}

export default CorreiosServiceValidatorService;
