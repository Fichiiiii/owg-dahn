exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const requestData = JSON.parse(event.body)
      const { input } = requestData
      
      return {
        statusCode: 200,
        body: JSON.stringify({ message: input }),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to process POST request' }),
      }
    }
  }
}
