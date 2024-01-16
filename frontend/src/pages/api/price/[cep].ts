import { NextApiRequest, NextApiResponse } from "next";

interface DeliveryMethod {
  name: string;
  code: string;
  value: string;
  deadline: string;
}

const deliveryMethods: DeliveryMethod[] = [
  {
    code: "standard",
    name: "Standard",
    value: "15,00",
    deadline: "10",
  },
  {
    code: "express",
    name: "Express",
    value: "20,00",
    deadline: "5",
  },
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { cep } = req.query;

    return res.send(deliveryMethods);
  }
};
