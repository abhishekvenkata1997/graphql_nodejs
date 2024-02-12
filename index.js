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
        game(_, args) { //parent, args, context
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) { //parent, args, context
            return db.reviews.find((review) => review.id === args.id)
        },
        authors() {
            return db.authors   
        },
        author(_, args) { //parent, args, context
            return db.authors.find((author) => author.id === args.id)
        },
    },
    //nested Queries
    Game:  {
        reviews(parent) { //parent refers to the value returned by parent of this reviews
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => game.id !== args.id)

            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random()*10000).toString()
            }
            db.games.push(game)

            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if(game.id === args.id){
                    return {...game,...args.edits}
                }

                return game
            })

            return db.games.find((game) => game.id === args.id)
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