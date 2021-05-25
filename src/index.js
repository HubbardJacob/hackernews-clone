const { ApolloServer } = require('apollo-server');



/*
The code below defines the GraphQL schema

Simple *query* type with one field called *info*
Type: "String!" means required and never can be null
*/
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
      id: ID!
      description: String!
      url: String!
  }
`



let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

/*
The actual implementation of the GraphQL schema.  
Structure is identical to the structure of the type definition inside typeDefs: Query.info.
*/
const resolvers = {
    Query: {
        info: () => 'This is a test API for hackernews clone',
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}


/*
This tells the server what API operations are accepted and how they should be resolved
*/
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );