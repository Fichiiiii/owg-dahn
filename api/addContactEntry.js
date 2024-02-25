exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      console.log(event.httpMethod)
      console.log(event)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'POST request processed successfully' }),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Failed to process POST request' }),
      }
    }
  }
}
