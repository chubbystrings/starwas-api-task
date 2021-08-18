const getAllCharacters = {
  get: {
    description: 'User can view all characters of a particular movie',
    summary: ' An anonymous User can view information about characters of a particular episode, no authentication is required',
    parameters: [{
      name: 'episode',
      in: 'path',
      required: true,
      description: 'episode ID',
      schema: {
        type: 'integer',
        format: 'int64',
        minimum: 1,
      },
    },
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Success',
            },
          },
        },
      },
      400: {
        description: 'Bad Request',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              status: 'error',
              message: 'episode id is missing or incorrect',
            },
          },
        },
      },
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              status: 'error',
              message: 'Movie not found',
            },
          },
        },
      },
      500: {
        description: 'internal server error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              status: 'error',
              message: 'could not fetch characters',
            },
          },
        },
      },
    },
  },
};

export default getAllCharacters;
