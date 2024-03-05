const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI)

mongoClient.connect()

const handler = async (event) => {
  try {
    const requestData = event.body

    if (event.httpMethod != 'POST') return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    }

    if (requestData.length < 25) return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid Request Body" })
    }

    const input = decodeURIComponent(requestData.replaceAll('+', ' '))
    await mongoClient.db("contact").collection("messages").insertOne({ message: input })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Request processed successfully", input: input }),
    }
  } catch (error) {
    return { 
      statusCode: 500, 
      body: error.toString() 
    }
  }
}

module.exports = { handler }
