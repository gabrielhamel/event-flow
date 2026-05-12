import z from "zod";
import { IdSchema, type Id } from "../../Id";

export const UserDTOSchema = z.object({
  id: IdSchema,
  email: z.email(),
  name: z.string(),
  avatarUrl: z.url().nullable(),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;

export class UserEntity {
  private readonly id: Id;
  private readonly email: string;
  private readonly avatarUrl: string | null;
  private readonly name: string;

  private constructor(data: UserDTO) {
    this.id = data.id;
    this.email = data.email;
    this.avatarUrl = data.avatarUrl;
    this.name = data.name;
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      avatarUrl: this.avatarUrl,
      name: this.name,
    };
  }

  static fromDTO(data: UserDTO) {
    return new UserEntity(data);
  }
}
