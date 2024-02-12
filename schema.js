export const typeDefs = `#graphql

    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    
    type Query {
        reviews: [Review]  
        review(id: ID!): Review 
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author

    }


`

//writing only reviews inside query means u can only jump in at querys point and view others
//gatekeeping entry on to the graph only via a review if we onlt have reviews
//compulsary to have type Query

//5 scaler types we can use
// '!'  means its a required field
// int , floats, strings, boolean and special ID(key for data objects)