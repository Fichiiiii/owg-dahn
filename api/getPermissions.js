exports.handler = async (event) => {
    try {
        const queryParams = event.queryStringParameters
    
        const userId = queryParams.key
    
        return {
            statusCode: 200,
            body: JSON.stringify({ key })
        }
    } catch (error) {
        return { 
            statusCode: 500, 
            body: error.toString() 
        }
    }
}
