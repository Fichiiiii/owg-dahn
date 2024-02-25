exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      const requestData = event.body

      if (!requestData.startsWith("input=")) return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid Request Body" })
      }

      const message = requestData.replace("input=", "")

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Request processed successfully", message: message })
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Failed to process POST request" })
      }
    }
  }
}
