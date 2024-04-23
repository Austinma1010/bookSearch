const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = await User.find({});
                return users;
            } catch(err) {
                console.error(err);
            }
        },
        user: async (parent, { _id }) => {
            console.log(_id);
            const id = _id;
            try {
                const user = await User.findOne({ _id: id })
                console.log(user);
                return user;
            } catch(err) {
                console.error(err);
            }
        }
    },

    Mutation: {
        login: async (_, { email, password }) => {
            
            const user = await User.findOne({ $or: [{ email }] });
            if (!user) {
              return res.status(400).json({ message: "Can't find this user" });
              }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
              return res.status(400).json({ message: 'Wrong password!' });
               }
            const token = signToken(user);
            return { token, user };
        },
        createUser: async (parent, args) => {
            console.log(args);
            try {
                console.log("about to create");
                const newUser = await User.create(args);
                console.log("Created");
                const token = signToken(newUser);
                return { token, newUser };
            } catch(err) {
                console.error(err);
            }
        },
        addBook: async (parent, { userId, book }) => {
            try {
                const user = await User.findOne({ _id: userId });
                user.savedBooks.push(book);
                await user.save();
                return user;
            } catch(err) {
                console.log(err);
            }
        }
    }
}
module.exports = resolvers;