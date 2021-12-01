import { getSchemaPath } from '@nestjs/swagger';

import ResponseEntity from '../common/response-entity';
import { CommentDto } from './comment.dto';

export const commentDtoSchema = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(ResponseEntity) },
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(CommentDto) },
          },
        },
      },
    ],
  },
};
