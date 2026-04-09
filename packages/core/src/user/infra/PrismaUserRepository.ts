import { fromPromise } from "neverthrow";
import type { Id } from "../../Id";
import type { PrismaClientInstance } from "../../infra/prisma";
import type { UserRepository } from "../domain/UserRepository";
import { UserEntity } from "../domain/UserEntity";

export class PrismaUserRepository implements UserRepository {
  private readonly prismaClient: PrismaClientInstance;

  constructor(prismaClient: PrismaClientInstance) {
    this.prismaClient = prismaClient;
  }

  getById(id: Id) {
    return fromPromise(
      this.prismaClient.user.findUniqueOrThrow({
        where: { id },
      }),
      (error) => new Error(JSON.stringify(error)),
    ).map((userRow) =>
      UserEntity.fromDTO({
        id: userRow.id as Id,
        email: userRow.email,
        avatarUrl: userRow.image,
      }),
    );
  }
}
