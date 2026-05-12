import type { ResultAsync } from "neverthrow";
import type { Id } from "../../Id";
import { UserEntity } from "./UserEntity";

export interface UserRepository {
  getById: (id: Id) => ResultAsync<UserEntity, Error>;
}
