const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY
const { buildIAMPolicy } = require('./lib/util')
const myRoles = {
    // role name vs function name
    'heroes:list': 'private'
}
const authorizeUser = (userScopes, methodArn) => {
    return userScopes.find(
        scope => ~methodArn.indexOf(myRoles[scope])
    )
}

exports.handler = async event => {
    const token = event.authorizationToken;

    try {
        const decodedUser = jwt.verify(
            token, JWT_KEY
        )
         
        const user = decodedUser.user
        const userId = user.username
        const isAllowed = authorizeUser(
            user.scopes,
            event.methodArn
        )

        // data to send on requests
        const authorizerContext = {
            user: JSON.stringify(user)
        }
        const policyDocument = buildIAMPolicy(
            userId,
            isAllowed ? 'Allow': 'Deny',
            event.methodArn,
            authorizerContext
        ) 
        return policyDocument
    } catch (error) {
        console.log('auth error**', error.stack)
        // 401 -> invalid or expired token
        // 403 -> token without permission to acess the function

        return {
            statusCode: 401,
            body: error.stack
        }
    }
}