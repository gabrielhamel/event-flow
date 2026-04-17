import z from "zod";
import type { UserRepository } from "../../user/domain/UserRepository";
import type { EventStormingRepository } from "../domain/EventStormingRepository";
import { IdSchema } from "../../Id";
import { EventStormingEntity } from "../domain/EventStormingEntity";

export const CreateEventStormingCommandSchema = z.object({
  id: IdSchema,
  ownerId: IdSchema,
});

export type CreateEventStormingCommand = z.infer<typeof CreateEventStormingCommandSchema>;

export class CreateEventStormingUseCase {
  private readonly userRepository: UserRepository;
  private readonly eventStormingRepository: EventStormingRepository;

  constructor(userRepository: UserRepository, eventStormingRepository: EventStormingRepository) {
    this.userRepository = userRepository;
    this.eventStormingRepository = eventStormingRepository;
  }

  execute(command: CreateEventStormingCommand) {
    return this.userRepository.getById(command.ownerId).andThen((owner) => {
      const eventStorming = EventStormingEntity.create(command.id, "", owner);

      return this.eventStormingRepository.save(eventStorming);
    });
  }
}
