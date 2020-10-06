const resolvers = {
    // GET
    Query: {
        async getSkill(root, args, context, info){
            return 'Hello world!'
        }
    },
    // POST (graphql doesnt use PUT)
    Mutation: {
         async createSkill(root, args, context, info){
            return 'Hello world!'
        }
    }
}

module.exports = resolvers