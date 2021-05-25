const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
},
{
    id: 'link-1',
    url: 'www.twitch.tv',
    description: 'twitch url for no reason'
}]

/*
The actual implementation of the GraphQL schema.  
Structure is identical to the structure of the type definition inside typeDefs: Query.info.
*/
let idCount = links.length
const resolvers = {
    Query: {
        info: () => 'This is a test API for hackernews clone',
        feed: () => links,
        link: (parent, args) =>
            links.find(link => link.id == args.id)
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },

        updateLink: (parent, args) => {
            let linkToUpdate = {}
            var newLinks = links.map(link => {
                if(link.id == args.id) {
                    linkToUpdate = Object.assign(
                        {}, 
                        link, 
                        {id: link.id, url: args.url,description: args.description}
                     )
                    return linkToUpdate
                }
                return link
            });
            links = newLinks

            return linkToUpdate
        },

        deleteLink: (parent, args) => {
            const linkToRem = links.find(link => link.id == args.id)
            links = links.filter(link => link.id != args.id)
            return linkToRem
        }
    }
}




/*
This tells the server what API operations are accepted and how they should be resolved
*/
const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'), 
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) => 
        console.log(`Server is running on ${url}`)
    );