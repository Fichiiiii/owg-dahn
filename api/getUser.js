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
    
        if (!key) return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid Request Body" })
        }

        const user = await mongoClient.db("accounts").collection("accountData").findOne({ key: key}, {})
        if (!user) return {
            statusCode: 400,
            body: JSON.stringify({ message: "User Not Found" })
        }

        const permissionInteger = (user.permissions >>> 0).toString(2)

        const permissions = {
            addArticles: permissionInteger[0],
            verifyArticles: permissionInteger[1],
            viewContactEntries: permissionInteger[2],
            configureAccounts: permissionInteger[3]
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ key: user.key, name: user.name, permissions: permissions })
        }
    } catch (error) {
        return { 
            statusCode: 500, 
            body: error.toString() 
        }
    }
}
