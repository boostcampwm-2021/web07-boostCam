import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cams } from './cams.entity';
import { CamsRepository } from './cams.repository';

@Injectable()
export class CamsService {
  constructor(@InjectRepository(Cams) private camsRepository: CamsRepository) {
    this.camsRepository = camsRepository;
  }
}
