import { TEST_GENERATED_UUID } from '../../app/constants';
import { validate } from 'uuid';

const v4 = () => {
  return TEST_GENERATED_UUID;
};

export { v4, validate };
