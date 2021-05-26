const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const { feed } = require(`./resolvers/Query.js`)
const { postLink, updateLink, deleteLink} = require(`./resolvers/Mutation.js`)


/*
The actual implementation of the GraphQL schema.  
Structure is identical to the structure of the type definition inside typeDefs: Query.info.
*/
const resolvers = {
    Query: {
        info: () => 'This is a test API for hackernews clone',
        feed: feed
        // link: (parent, args) =>
        //     links.find(link => link.id == args.id)
    },
    Mutation: {
        postLink: postLink,
        updateLink: updateLink,
        deleteLink: deleteLink
    }
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
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );