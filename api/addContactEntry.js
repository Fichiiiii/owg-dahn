const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI);

mongoClient.connect();

const handler = async (event) => {
    try {
      const requestData = event.body

      if (!requestData.startsWith("input=")) return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid Request Body" })
      }

      const message = requestData.replace("input=", "")
      const input = decodeURIComponent(message.replaceAll('+', ' '))
    
      await client.db("contact").collection("messages").insertOne({ message: input })

        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }
