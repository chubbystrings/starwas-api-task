const postComment = {
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
              message: 'could not post comment',
            },
          },
        },
      },
    },
  },
};

export default postComment;
