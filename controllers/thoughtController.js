const { Thought } = require('../models/thought');

const thoughtController = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find().select('-__v').populate('thoughtText');
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Get one thought by id
    async getThoughtById(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // Create thought
    async createThought(req, res) {
        try {
            const { body, params } = req;
            console.log(body);
            const thought = await Thought.create(body);
            const dbUserData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.json(err);
        }
    },

    // Update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id' });
                return;
            }
            res.status(200).json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete thought
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            const dbUserData = await User.findOneAndUpdate(
                { username: req.params.username },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!dbUserData) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            }
            res.json(dbUserData);
        } catch (err) {
            res.json(err);
        }
    },

    // Add reaction to thought
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;
