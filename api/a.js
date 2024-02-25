exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify({message: "gay"}),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to process GET request' }),
      }
    }
  }
}
