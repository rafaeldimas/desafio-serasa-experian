import { DomainError } from '@/errors/domain-error';

export class HarvestNotFoundError extends DomainError {
  constructor(id: string) {
    super(`Harvest id (${id}) not found`, 'HARVEST_NOT_FOUND');
  }
}
