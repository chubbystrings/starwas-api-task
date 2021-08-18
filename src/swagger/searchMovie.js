const searchAMovie = {
  get: {
    description: 'User can search for a particular movie',
    summary: ' An anonymous User can search for a particular movie, no authentication is required',
    parameters: [{
      name: 'search',
      in: 'query',
      required: true,
      description: 'The movie name',
      schema: {
        type: 'string',
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
              message: 'could not fetch movie',
            },
          },
        },
      },
    },
  },
};

export default searchAMovie;
