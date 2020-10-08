const resolvers = {
    Hero: {
        // for each hero getHero returns, this function will be executed like a subquery 
        async skills(root, args, context){
            const skills = root.skills.map(el => context.Skill.findOne(el))
            const results = await Promise.all(skills)
            const all = results.reduce((prev, next) => prev.concat(next), [])
            return all;
        }
    },
    // GET
    Query: {
        async getHero(root, args, context, info){
            return context.Hero.findAll(args)
        }
    },
    // POST (graphql doesnt use PUT)
    Mutation: {
         async createHero(root, args, context, info){
            const { id } = await context.Hero.create(args)
            return id
        }
    }
}

module.exports = resolvers