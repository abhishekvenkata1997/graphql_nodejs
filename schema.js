export const typeDefs = `#graphql

    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }
    
    type Query {
        reviews: [Review]  
        games: [Game]
        authors: [Author]

    }


`

//writing only reviews inside query means u can only jump in at querys point and view others
//gatekeeping entry on to the graph only via a review if we onlt have reviews
//compulsary to have type Query

//5 scaler types we can use
// '!'  means its a required field
// int , floats, strings, boolean and special ID(key for data objects)