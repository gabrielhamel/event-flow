import type { ResultAsync } from "neverthrow";
import type { Id } from "../../Id";
import { EventStormingEntity } from "./EventStormingEntity";

export interface EventStormingRepository {
  getById: (id: Id) => ResultAsync<EventStormingEntity, Error>;
  save: (entity: EventStormingEntity) => ResultAsync<void, Error>;
}
