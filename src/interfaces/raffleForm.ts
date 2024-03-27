export interface Question {
  title: string;
  description: string;
  type: string;
  template: string;
  isRequired: boolean;
}

export interface RaffleForm {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}
