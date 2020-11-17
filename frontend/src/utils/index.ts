// 100 => R$1.00
export const priceFormmater = (price: number) =>
  `R$${(price / 100).toFixed(2)}`;

export const randomColor = () => {
  const pool = [
    "#1D201F",
    "#2E294E",
    "#070707",
    "#5F00BA",
    "#1D1A31",
    "#2A6041",
    "#656176",
    "#2F004F",
  ];

  return pool[Math.floor(Math.random() * pool.length)];
};
