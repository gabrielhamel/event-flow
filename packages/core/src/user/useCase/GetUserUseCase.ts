import type { Id } from "../../Id";
import type { UserRepository } from "../domain/UserRepository";

export class GetUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  execute(id: string) {
    return this.userRepository.getById(id as Id).map((user) => user.toDTO());
  }
}
