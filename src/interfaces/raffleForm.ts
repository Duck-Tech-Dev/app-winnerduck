import RaffleQuestion from "./raffleQuestion";

export default interface RaffleForm {
  id: string;
  title: string;
  description: string;
  questions: RaffleQuestion[];
}
