/**
 * Хакатон включает в себя:
 * одну задачу от заказчика,
 * сроки, бюджет и так далее
 */
export type Hackathon = {
  id: string;
  name: string;
  description: string;
  /** Описание задания */
  task: string;
  /** Срок выполнения */
  limitation: string;
  prizeFund: {
    total: number;
    first: number;
    second: number;
    third: number;
  }
};
