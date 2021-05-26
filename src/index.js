const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils.js');

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')


/*
The actual implementation of the GraphQL schema.  
Structure is identical to the structure of the type definition inside typeDefs: Query.info.
*/
const resolvers = {
    Query,
    Mutation,
    User,
    Link
}



const prisma = new PrismaClient()
/*
This tells the server what API operations are accepted and how they should be resolved
*/
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'), 
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
                req && req.headers.authorization
                    ? getUserId(req)
                    : null
        }
    }
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );