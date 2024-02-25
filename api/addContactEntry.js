exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      return {
        statusCode: 200,
        body: JSON.stringify(event),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to process POST request' }),
      }
    }
  }
}
