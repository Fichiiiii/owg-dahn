// api.js

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
      try {
        // Return the data as the response
        return {
          statusCode: 200,
          body: JSON.stringify({message: "gay"}),
        };
      } catch (error) {
        // Return an error response if there was an issue processing the request
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to process GET request' }),
        };
      }
    }
  };
