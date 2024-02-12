import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone'
import {typeDefs} from './schema.js'
import db from './_db.js'


//resolver functions
const resolvers = {
    Query: {
        games() {
            return db.games //dont worry about which fields to return
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors   
        }
    }
}

/*
    games {
        title
    }
*/
//server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
    //typeDefs = defintion of different types of data we want to expose on our graph 
    //typeDefs -> takes object as argument type Definition -> description of datatypes and relation with other datatypes
    //resolvers -> Resolver functions that determine how we responsd to different queries on the graph

})

const { url } = await startStandaloneServer(server, {
    listen: {port: 4000}
});

console.log('Server ready at port',4000)