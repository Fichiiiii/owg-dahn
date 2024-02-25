exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const requestBody = JSON.parse(event.body)

      return {
        statusCode: 200,
        body: JSON.stringify({ message: requestBody }),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to process POST request' }),
      }
    }
  }
}
