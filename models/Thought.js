// Import necessary modules
const mongoose = require('mongoose');
const dayjs = require('dayjs');

// Define the reaction schema
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    //required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    //required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) =>
      dayjs(createdAt).format('MMM DD, YYYY [at] h:mm:ss a'),
  },
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
});

// Define the thought schema
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) =>
      dayjs(createdAt).format('MMM DD, YYYY [at] h:mm:ss a'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
});

// Define the Thought model
const Thought = mongoose.model('thought', thoughtSchema);

// Define a virtual property `reactionCount` for the thought schema
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Export the Thought model
module.exports = { Thought };
