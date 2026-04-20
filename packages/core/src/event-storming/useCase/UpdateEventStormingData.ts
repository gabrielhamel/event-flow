import z from "zod";
import type { EventStormingRepository } from "../domain/EventStormingRepository";
import { IdSchema } from "../../Id";

export const UpdateEventStormingDataCommandSchema = z.object({
  id: IdSchema,
  data: z.instanceof(Uint8Array<ArrayBuffer>),
});

export type UpdateEventStormingDataCommand = z.infer<typeof UpdateEventStormingDataCommandSchema>;

export class UpdateEventStormingDataUseCase {
  private readonly eventStormingRepository: EventStormingRepository;

  constructor(eventStormingRepository: EventStormingRepository) {
    this.eventStormingRepository = eventStormingRepository;
  }

  execute(command: UpdateEventStormingDataCommand) {
    return this.eventStormingRepository.getById(command.id).andThen((eventStorming) => {
      const updated = eventStorming.updateData(command.data);

      return this.eventStormingRepository.save(updated);
    });
  }
}
