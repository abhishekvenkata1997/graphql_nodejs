import {ApolloServer} from '@apollo/server'
import {startStandAloneServer} from '@apollo/server/standalone'


//server setup
const server = new ApolloServer({
    //typeDefs -> takes object as argument type Definition -> description of datatypes and relation with other datatypes
    //resolvers -> Resolver functions that determine how we responsd to different queries on the graph

})

const { url } = await startStandAloneServer(server, {
    listen: {port: 4000}
});

console.log('Server ready at port',4000)