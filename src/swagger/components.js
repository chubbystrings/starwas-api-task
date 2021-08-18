const comps = {
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
};

export default comps;
