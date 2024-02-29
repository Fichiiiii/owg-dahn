exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const requestData = event.body

      if (!requestData.startsWith("input=")) return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid Request Body" })
      }

      const message = requestData.replace("input=", "")
      const input = decodeURIComponent(message.replaceAll('+', ' '))

      const envVar = process.env.TEST

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Request processed successfully", input: envVar })
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed to process POST request" })
      }
    }
  }
}
