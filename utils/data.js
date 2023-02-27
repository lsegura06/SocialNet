const { Types } = require('mongoose')

const names = [
  'Leo Segura', // [0]
  'Diego Ramirez', // [1]
  'Jayra Delgado', // [2]
  'Gabriel Estrella', // [3]
]


const usernames = [
  'LeoSeg', // [0]
  'DieRam', // [1]
  'JayDel', // [2]
  'GabEst', // [3]
]


const email = [
  'Leo@email.com', // [0]
  'Diego@email.com', // [1]
  'Jayra@email.com', // [2]
  'Gab@email.com', // [3]
]


const thoughts = [
  `Music is awesome`, // [0]
  `Gym is life`, // [1]
  `I love working`, // [2]
  `I like video games`, // [3]
]


const reactions = [
  {reactionId: new Types.ObjectId(), username:'GabEst', reactionBody: `What type of music do you like?`}, // [0]
  {reactionId: new Types.ObjectId(), username:'LeoSeg', reactionBody: `What gym do you go to?`}, // [1]
  {reactionId: new Types.ObjectId(), username:'JayDel', reactionBody: `What game are you playing?`}, // [2]
  {reactionId: new Types.ObjectId(), username:'DieRam', reactionBody: `Where do you work?`}, // [3]
]


// Function to get all users
function getUsers() {
  return names.map((name, index) => ({
    name,
    username: usernames[index],
    email: email[index],
  }));
}

// Function to get all thoughts
function getThoughts() {
  return thoughts.map((thought, index) => ({
    thought,
    reactions: reactions[index],
  }));
}

module.exports = {
  getUsers,
  getThoughts,
}