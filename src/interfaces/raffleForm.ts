export interface Question {
  title: string;
  description: string;
  type: string;
  template: string;
}

export interface RaffleForm {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}
