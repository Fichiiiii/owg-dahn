const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI)

mongoClient.connect()

const handler = async (event) => {
  try {
    if (event.httpMethod != 'GET') return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    }

    const queryParams = event.queryStringParameters
    const authKey = queryParams.auth ?? ""

    if (!authKey) return {
        statusCode: 401,
        body: JSON.stringify({ message: "Missing Authorization Token" })
    }

    let permission = 0

    await fetch(`https://owg-dahn.com/api/getUser?key=${authKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => {return r.json()})
    .then(data => permission = data.permissions)

    if (!permission?.viewContactEntries) return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized Request" })
    }

    const contactEntries = mongoClient.db("contact").collection("messages").find({})

    return {
        statusCode: 200,
        body: JSON.stringify({ entries: typeof contactEntries })
    }

  } catch (error) {
    return { 
      statusCode: 500, 
      body: error.toString() 
    }
  }
}

module.exports = { handler }
