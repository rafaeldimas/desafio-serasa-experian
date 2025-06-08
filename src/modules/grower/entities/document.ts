import { DocumentType } from '@/modules/grower/entities/grower.entity';
import { InvalidDocumentError } from '@/modules/grower/errors/invalid-document';
import { cnpj, cpf } from 'cpf-cnpj-validator';

export class Document {
  private documentType: DocumentType;

  constructor(private readonly documentNumber: string) {
    if (!documentNumber) {
      throw new InvalidDocumentError();
    }

    if (!this.isValid()) {
      throw new InvalidDocumentError();
    }
  }

  static create(documentNumber: string): Document {
    return new Document(documentNumber);
  }

  getNumber(): string {
    return this.documentNumber;
  }

  getType(): DocumentType {
    return this.documentType;
  }

  isValid(): boolean {
    if (cpf.isValid(this.documentNumber)) {
      this.documentType = DocumentType.CPF;
      return true;
    }

    if (cnpj.isValid(this.documentNumber)) {
      this.documentType = DocumentType.CNPJ;
      return true;
    }

    return false;
  }
}
