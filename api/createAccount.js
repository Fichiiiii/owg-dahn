const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI)

mongoClient.connect()

const handler = async (event) => {
  try {
    if (event.httpMethod != 'POST') return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    }

    const headers = event.headers
    const authKey = headers['authorization'] ?? ""

    let permission = 0

    await fetch(`https://owg-dahn.com/api/getUser?key=${authKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => {return r.json()})
    .then(data => permission = data.permissions)

    if (!permission?.configureAccounts) return {
        statusCode: 401,
        body: JSON.stringify({ message: "Unauthorized Request" })
    }

    const requestData = JSON.parse(event.body)

    return {
          statusCode: 418,
          body: JSON.stringify(requestData)
      }

    if (!requestData.name || !requestData.permissions) return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid Request Body" })
    }

    const charRange = [[48, 57], [65, 90], [97, 122]]

    let key = ""

    for (let i = 0; i < 21; i++) {
        const range = Math.floor(Math.random() * 3)

        key += String.fromCharCode(charRange[range][0] + Math.floor(Math.random() * (charRange[range][1] - charRange[range][0] + 1)))
    }

    await mongoClient.db("accounts").collection("accountData").insertOne({ key: key, name: requestData.name, permissions: requestData.permissions })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Request processed successfully", user: { key: key, name: requestData.name, permissions: requestData.permissions } }),
    }
  } catch (error) {
    return { 
      statusCode: 500, 
      body: error.toString() 
    }
  }
}

module.exports = { handler }
