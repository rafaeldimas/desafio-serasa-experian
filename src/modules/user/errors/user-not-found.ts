import { DomainError } from '@/errors/domain-error';

export class UserNotFound extends DomainError {
  constructor(id: string) {
    super(`User id (${id}) not found`, 'USER_NOT_FOUND');
  }
}
