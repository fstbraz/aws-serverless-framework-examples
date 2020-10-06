const resolvers = {
    // GET
    Query: {
        async getHero(root, args, context, info){
            return 'Hello world!'
        }
    },
    // POST (graphql doesnt use PUT)
    Mutation: {
         async createHero(root, args, context, info){
            return 'Hello world!'
        }
    }
}

module.exports = resolvers