import { DomainError } from '@/errors/domain-error';

export class FarmNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Farm id (${id}) not found`, 'FARM_NOT_FOUND');
  }
}
