import z from "zod";
import { IdSchema, type Id } from "../../Id";
import { UserDTOSchema, UserEntity } from "../../user/domain/UserEntity";

export const EventStormingDTOSchema = z.object({
  id: IdSchema,
  name: z.string(),
  data: z.instanceof(Uint8Array<ArrayBuffer>).nullable(),
  owner: UserDTOSchema,
});

export type EventStormingDTO = z.infer<typeof EventStormingDTOSchema>;

export class EventStormingEntity {
  private readonly id: Id;
  private readonly name: string;
  private readonly data: Uint8Array<ArrayBuffer> | null;
  private readonly owner: UserEntity;

  private constructor(data: {
    id: Id;
    name: string;
    data: Uint8Array<ArrayBuffer> | null;
    owner: UserEntity;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.data = data.data;
    this.owner = data.owner;
  }

  toDTO(): EventStormingDTO {
    return {
      id: this.id,
      name: this.name,
      data: this.data,
      owner: this.owner.toDTO(),
    };
  }

  updateData(data: Uint8Array<ArrayBuffer>) {
    return new EventStormingEntity({
      id: this.id,
      name: this.name,
      data,
      owner: this.owner,
    });
  }

  static create(id: Id, name: string, owner: UserEntity) {
    return new EventStormingEntity({
      id,
      name,
      data: null,
      owner,
    });
  }

  static fromDTO(data: EventStormingDTO) {
    return new EventStormingEntity({
      ...data,
      owner: UserEntity.fromDTO(data.owner),
    });
  }
}
