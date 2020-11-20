// 100 => R$1.00
export const priceFormmater = (price: number) =>
  `R$${(price / 100).toFixed(2)}`;
