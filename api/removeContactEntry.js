const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI)

mongoClient.connect()

const handler = async (event) => {
  try {
    if (event.httpMethod != 'POST') return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    }

    const requestData = event.body

    if (!requestData) return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid Request Body" })
    }

    const id = new ObjectId(requestData)
    const entry = await mongoClient.db("contact").collection("messages").findOne(id)
    if (!entry) return {
        statusCode: 400,
        body: JSON.stringify({ message: "Entry does not exist" })
    }

    mongoClient.db("contact").collection("messages").deleteOne(entry._id)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Entry deleted successfully", entry: entry._id }),
    }
  } catch (error) {
    return { 
      statusCode: 500, 
      body: error.toString() 
    }
  }
}

module.exports = { handler }
