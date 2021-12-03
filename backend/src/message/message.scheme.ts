import { getSchemaPath } from '@nestjs/swagger';

import ResponseEntity from '../common/response-entity';
import { MessageDto } from './message.dto';

export const MessageDtoSchema = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(ResponseEntity) },
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(MessageDto) },
          },
        },
      },
    ],
  },
};
