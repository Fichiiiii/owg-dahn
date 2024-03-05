const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.MONGODB_URI)

mongoClient.connect()

exports.handler = async (event) => {
    try {
        if (event.httpMethod != 'GET') return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" })
        }

        const queryParams = event.queryStringParameters
        const key = queryParams.key ?? ""
    
        const user = await mongoClient.db("accounts").collection("accountData").findOne({ key: key}, {})

        return {
            statusCode: 200,
            body: JSON.stringify({ user })
        }
    } catch (error) {
        return { 
            statusCode: 500, 
            body: error.toString() 
        }
    }
}
