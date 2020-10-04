/**
 * Любой пользователь в системе,
 * который может учатсвовать в хакатонах
 * */
export type User = {
  id: string;
  firstName: string | null;
  lastName?: string;
  email: string | null;
  photoURL: string | null
  age?: number;
  region?: string;
};
