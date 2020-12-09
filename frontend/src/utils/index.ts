// 100 => R$1.00
export const priceFormmater = (price: number) =>
  `R$${(price / 100).toFixed(2)}`;

export const dateFormmater = (dateAsString: string) => {
  const date = new Date(dateAsString);

  // for some reason getMonth is 0 indexed.

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// 55,55  => 5555
export const shippingServicePriceFormmater = (price: string) =>
  parseInt(price.replace(",", ""));
