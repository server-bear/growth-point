import { Hackathon } from './hackathon';
import { User } from './user';

export type LoginResponse = {
  user: User
};

export type HackathonsApi = {
  hackathons: Hackathon[];
};
