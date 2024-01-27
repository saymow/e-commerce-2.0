export const priceFormatter = (price: number) =>
  `R$${(price / 100).toFixed(2)}`;

export const dateFormatter = (dateAsString: string) => {
  const date = new Date(dateAsString);

  // for some reason getMonth is 0 indexed.

  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
};

export const shortenUUID = (id: string) => {
  return `${id.slice(0, 5)}...`;
};