/**
 * Любой пользователь в системе,
 * который может учатсвовать в хакатонах
 * */
export type User = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  photoURL?: string;
  age?: number;
  region?: string;
};
