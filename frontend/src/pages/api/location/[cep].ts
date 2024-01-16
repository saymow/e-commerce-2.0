import { NextApiRequest, NextApiResponse } from "next";
import { consultarCep } from "correios-brasil";

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
