import type { Id } from "../../Id";
import type { EventStormingRepository } from "../domain/EventStormingRepository";

export class GetEventStormingUseCase {
  private readonly eventStormingRepository: EventStormingRepository;

  constructor(eventStormingRepository: EventStormingRepository) {
    this.eventStormingRepository = eventStormingRepository;
  }

  execute(id: Id) {
    return this.eventStormingRepository.getById(id).map((eventStorming) => eventStorming.toDTO());
  }
}
