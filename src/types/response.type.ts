import type { ICard } from "@/models/cards.model";

export type ResponseType = {
  data: Array<ICard>;
  statusCode: number;
}