import RaffleQuestion from "./raffleQuestion";

type Status = "draft" | "ready" | "running" | "finished" | "archived";

export enum RaffleStatus {
  draft = "draft",
  ready = "ready",
  running = "running",
  finished = "finished",
  archived = "archived"
}

export default interface RaffleForm {
  id: string;
  title: string;
  description: string;
  status: Status,
  form: RaffleQuestion[];
  author_id: number
}
