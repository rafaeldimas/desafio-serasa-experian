import { DomainError } from '@/errors/domain-error';

export class InvalidDocumentError extends DomainError {
  constructor() {
    super('Document is invalid', 'INVALID_DOCUMENT');
  }
}
