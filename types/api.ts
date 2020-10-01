import { Hackathon } from './hackathon';
import { User } from './user';

export type LoginResponse = {
  token: string;
  user: User
};

export type HackathonsApi = {
  hackathons: Hackathon[];
};
