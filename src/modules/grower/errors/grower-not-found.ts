import { DomainError } from '@/errors/domain-error';

export class GrowerNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Grower id (${id}) not found`, 'GROWER_NOT_FOUND');
  }
}
