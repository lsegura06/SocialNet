const User = require('../models/User');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-__v');
            res.json(users);
        } catch (err) {
            console.log({ message: err });
            res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateUser: async (req, res) => {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with that ID' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });
            if (!deletedUser) {
                res.status(404).json({ message: 'No user with this ID' });
                return;
            }
            await User.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: false }
            );
            res.json('You have successfully deleted a user.');
        } catch (err) {
            res.json(err);
        }
    },

    createFriend: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    deleteFriend: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
