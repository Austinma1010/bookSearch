const { User, Book } = require('../models');

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
            try {
                const user = await User.findById(_id);
                return user;
            } catch(err) {
                console.error(err);
            }
        }
    },

    Mutation: {
        login: async (_, { input }) => {
            const { email, password } = input;
            const user = await User.findOne({ $or: [{ email }] });
            if (!user) {
              return res.status(400).json({ message: "Can't find this user" });
              }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
              return res.status(400).json({ message: 'Wrong password!' });
               }
            const token = signToken(user);
            res.json({ token, user });
        },
        createUser: async (_, { input }) => {
            try {
                console.log("about to create");
                const newUser = await User.create(input);
                console.log("Created");
                const token = signToken(newUser);
                res.json({ token, newUser });
            } catch(err) {
                console.error(err);
            }
        }
    }
}