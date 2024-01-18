import { addDays } from './date';

const WEEK_DAYS = 7;

describe('Date Utils', () => {
  describe('add Days', () => {
    it('Should be able to increment on positive days', () => {
      const now = new Date();

      for (let idx = 0; idx < 100; idx++) {
        expect(addDays(now, idx).getDay()).toBe(
          (now.getDay() + idx) % WEEK_DAYS
        );
      }
    });
  });
});
