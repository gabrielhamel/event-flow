import { fromPromise } from "neverthrow";
import type { Id } from "../../Id";
import type { PrismaClientInstance } from "../../infra/prisma";
import type { EventStormingRepository } from "../domain/EventStormingRepository";
import { EventStormingEntity } from "../domain/EventStormingEntity";

export class PrismaEventStormingRepository implements EventStormingRepository {
  private readonly prismaClient: PrismaClientInstance;

  constructor(prismaClient: PrismaClientInstance) {
    this.prismaClient = prismaClient;
  }

  save(entity: EventStormingEntity) {
    const entityDTO = entity.toDTO();

    return fromPromise(
      this.prismaClient.eventStorming.upsert({
        where: { id: entityDTO.id },
        create: {
          id: entityDTO.id,
          name: entityDTO.name,
          data: entityDTO.data,
          ownerId: entityDTO.owner.id,
        },
        update: {
          name: entityDTO.name,
          data: entityDTO.data,
          ownerId: entityDTO.owner.id,
        },
      }),
      (error) => new Error(JSON.stringify(error)),
    ).map(() => undefined);
  }

  getById(id: Id) {
    return fromPromise(
      this.prismaClient.eventStorming.findUniqueOrThrow({
        where: { id },
        include: {
          owner: true,
        },
      }),
      (error) => new Error(JSON.stringify(error)),
    ).map((eventStormingRow) =>
      EventStormingEntity.fromDTO({
        id: eventStormingRow.id as Id,
        name: eventStormingRow.name,
        data: eventStormingRow.data,
        owner: {
          id: eventStormingRow.owner.id as Id,
          email: eventStormingRow.owner.email,
          avatarUrl: eventStormingRow.owner.image,
          name: eventStormingRow.owner.name,
        },
      }),
    );
  }
}
