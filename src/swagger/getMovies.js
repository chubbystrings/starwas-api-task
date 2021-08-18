const getAllMovies = {
  get: {
    description: 'User can view all movies',
    summary: 'An anonymous User can fetch all movies, No authentication is required',
    parameters: [{
      name: 'search',
      in: 'query',
      description: 'The movie name',
      schema: {
        type: 'string',
      },
    }],
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
              message: 'could not fetch movies',
            },
          },
        },
      },
    },
  },
};

export default getAllMovies;
