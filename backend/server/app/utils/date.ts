export const addDays = (date: Date, increment: number): Date => {
  return new Date(date.getTime() + increment * 24 * 60 * 60 * 1000);
};
