const { readdirSync } = require('fs')
const { makeExecutableSchema, mergeSchemas, gql} = require('apollo-server-lambda')

// 1 - read directory
const schemas = readdirSync(__dirname)
    // 2 - ignore index.js file
    .filter(file => file !== 'index.js')
    // 3 - require all the index.js files from the folders (hero, skill, etc..)
    .map(folder => require(`./${folder}`))
        // 4 - create a GraphQl mergin all the respective schemas and resolvers
    .map(({schema, resolvers}) => 
        makeExecutableSchema(
            {
                // gql validates the string schema and returns the correct format, (not mandatory but recomended)
                typeDefs: gql(schema),
                resolvers
            }
        ) 
    )

/*
hero resolver
{
    Query: { getHero }
}

skill resolver
{
    Query: { getSkill }
}

skill + hero = query content replacement

mergeSchemas :
{
    Query: {
        getHero,
        getSkill
    }
}

*/


module.exports = mergeSchemas({
    schemas
})