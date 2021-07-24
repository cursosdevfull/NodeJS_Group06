import { v4 as uuidv4 } from 'uuid';

export const generateTrace = (): string => {
  return uuidv4();
};
