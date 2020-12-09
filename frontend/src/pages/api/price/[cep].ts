import { NextApiRequest, NextApiResponse } from "next";
import { calcularPrecoPrazo } from "correios-brasil";

let args = {
  // nCdServico: "04014", // SEDEX/PAC
  sCepOrigem: "03937-087", // https://www.4devs.com.br/gerador_de_cep
  // sCepDestino: "32603-235",
  nVlPeso: 0.8, // In KG.
  nCdFormato: 1, //1 = Formato caixa/pacote 2 = Formato rolo/prisma 3 = Envelope
  nVlComprimento: 20, // decimal
  nVlAltura: 15, //decimail
  nVlLargura: 15, //decimail
};

const deliveryMethodsAvailable = {
  SEDEX: "04014",
  PAC: "04510",
  "04014": "Sedex",
  "04510": "Pac",
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { cep } = req.query;

    const shipmentResult = await calcularPrecoPrazo(
      Object.assign(args, {
        sCepDestino: cep,
        nCdServico: [
          deliveryMethodsAvailable.PAC,
          deliveryMethodsAvailable.SEDEX,
        ],
      })
    );

    let serializedResponse: any = [];

    Object.values(shipmentResult).forEach((service: any) => {
      if (service.Erro !== "0") {
        return serializedResponse.push({
          name: (deliveryMethodsAvailable as any)[service.Codigo],
          code: service.Codigo,
          error: {
            code: service.Erro,
            message: "Error on calculating shipment price.",
          },
        });
      }

      serializedResponse.push({
        name: (deliveryMethodsAvailable as any)[service.Codigo],
        value: service.Valor,
        code: service.Codigo,
        deadline: service.PrazoEntrega,
      });
    });

    res.send(serializedResponse);
  }
};
