import { NextApiRequest, NextApiResponse } from "next";
import { consultarCep } from "correios-brasil";

// let args = {
//   nCdServico: "04014", // SEDEX/PAC
//   sCepOrigem: "03937-087", // https://www.4devs.com.br/gerador_de_cep
//   sCepDestino: "32603-235",
//   nVlPeso: 0.8, // In KG.
//   nCdFormato: 1, //1 = Formato caixa/pacote 2 = Formato rolo/prisma 3 = Envelope
//   nVlComprimento: 0.1, // decimal
//   nVlAltura: 0.1, //decimail
//   nVlLargura: 0.1, //decimail
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { cep } = req.query;

    const result = await consultarCep(cep);

    if (result.erro) res.status(400).send({});

    const formmatedData = {
      state: result.uf,
      city: result.localidade,
      neighborhood: result.bairro,
      postal_code: result.cep,
      street: result.logradouro,
    };

    res.setHeader("Content-Type", "application/json");
    res.send(formmatedData);
  }
};
