const redis = require('redis')

const client = createClient({
  password: 'process.env.REDIS_PASS',
  socket: {
      host: 'redis-17814.c300.eu-central-1-1.ec2.cloud.redislabs.com',
      port: 17814
  }
})

async function getData(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
    })
  })
}

async function setEntry(key, value) {
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, reply) => {
      if (err) {
        reject(err)
      } else {
        resolve(reply)
      }
    })
  })
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'POST') {
    try {
      // Connect to a Redis Database
      client.on('error', (err) => {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: "Internal Server Error" })
        }
      })

      // Process the request
      const requestData = event.body

      if (!requestData.startsWith("input=")) return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid Request Body" })
      }

      const message = requestData.replace("input=", "")
      const input = decodeURIComponent(message.replaceAll('+', ' '))

      let contactEntries = JSON.parse(getData("contactEntries")) ?? []
      contactEntries.push(input)

      await setEntry("contactEntries", contactEntries)

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Request processed successfully", input: input })
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Failed to process POST request" })
      }
    }
  }
}
