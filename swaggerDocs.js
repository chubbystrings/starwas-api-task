module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'STARWARS API',
    description: 'A Simple Api for Starwars movies',
    contact: {
      name: 'chubbystrings',
      email: 'emartinsokwor@gmail.com',
      url: 'http://chubbystrings.gihub.io/portfolio',
    },
  },
  servers: [
    {
      url: 'http://localhost:4500',
      description: 'Local server',
    },
    {
      url: 'https://starwars-api-task.herokuapp.com',
      description: 'production server',
    },
  ],
  paths: {
    '/api/v1/starwars': {
      get: {
        description: 'User can view all movies',
        summary: 'An anonymous User can fetch all movies, No authentication is required',
        parameters: [],
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
          500: {
            description: 'internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  status: 'error',
                  message: 'could not fetch data',
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/starwars/{episode}/characters': {
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
    },
    '/api/v1/starwars/{episode}/comment': {
      get: {
        description: 'User can fetch all comments of a particular movie',
        summary: 'An anonymous User can view all comments related to a particular movie, no authentication is required',
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
          500: {
            description: 'internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  status: 'error',
                  message: 'could not fetch comments',
                },
              },
            },
          },
        },
      },
      post: {
        description: 'User can post a comments to a particular movie',
        summary: 'An anonymous User can post comments to a particular movie, no authentication is required',
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
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Comment',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'CREATED',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Success',
                },
                example: {
                  status: 'success',
                  data: {

                    comment_id: 3,
                    episode_id: 1,
                    comment: 'great movie',
                    created_on: '2021-08-17T13:15:12.164Z',
                  },
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
          500: {
            description: 'internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  status: 'error',
                  message: 'could not post comment',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Comment: {
        type: 'object',
        properties: {
          comment: {
            type: 'string',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
      Success: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          data: {
            type: 'object',
          },
        },
      },
    },
  },
};
