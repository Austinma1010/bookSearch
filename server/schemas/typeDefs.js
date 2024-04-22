const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}

input LoginInput {
    email: String!
    password: String!
}

type AuthPayload {
    token: String!
    user: User!
}

 type Query {
    users: [User]
    user(_id: ID!): [User]
 }

 type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    addBook(userId: ID!, book: BookInput!): User
    login(input: LoginInput!): AuthPayload!
 }
`;

module.exports = typeDefs;