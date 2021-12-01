import { getSchemaPath } from '@nestjs/swagger';

import ResponseEntity from '../common/response-entity';
import { UserDto } from '../user/user.dto';
import ServerWithUsersDto from './dto/response-server-users.dto';

export const serverWithUserDtoSchema = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(ResponseEntity) },
      {
        properties: {
          data: {
            allOf: [
              { $ref: getSchemaPath(ServerWithUsersDto) },
              {
                properties: {
                  users: {
                    type: 'array',
                    items: { $ref: getSchemaPath(UserDto) },
                  },
                },
              },
            ],
          },
        },
      },
    ],
  },
};

export const serverCodeSchema = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(ResponseEntity) },
      {
        properties: {
          data: {
            type: 'string',
          },
        },
      },
    ],
  },
};

export const emptyResponseSchema = {
  schema: {
    allOf: [
      { $ref: getSchemaPath(ResponseEntity) },
      {
        properties: {
          data: {
            type: null,
          },
        },
      },
    ],
  },
};
