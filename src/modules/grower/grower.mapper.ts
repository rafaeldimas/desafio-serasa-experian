import { CreateGrowerRequest } from '@/modules/grower/dto/create-grower.request';
import { GrowerResponse } from '@/modules/grower/dto/grower.response';
import { UpdateGrowerRequest } from '@/modules/grower/dto/update-grower.request';
import { Document } from '@/modules/grower/entities/document';
import { Grower } from '@/modules/grower/entities/grower.entity';
import { plainToClass } from 'class-transformer';

export class GrowerMapper {
  static entityToResponse(grower: Grower): GrowerResponse {
    return plainToClass(GrowerResponse, {
      id: grower.id,
      name: grower.name,
      document: grower.documentNumber,
    });
  }

  static entityListToResponseList(growers: Grower[]): GrowerResponse[] {
    return growers.map((grower) => GrowerMapper.entityToResponse(grower));
  }

  static requestToEntity(
    request: CreateGrowerRequest | UpdateGrowerRequest,
  ): Grower {
    const partialEntity: Partial<Grower> = {};

    if (request.name) {
      partialEntity.name = request.name;
    }

    if (request.document) {
      const document = Document.create(request.document);
      partialEntity.documentNumber = document.getNumber();
      partialEntity.documentType = document.getType();
    }

    return plainToClass(Grower, partialEntity);
  }
}
