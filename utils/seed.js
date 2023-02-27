const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getUsers, getThoughts } = require('./data');

const seedDatabase = async () => {
    try {
        await connection.once('open', async () => {
            console.log('Connected Successfully!');

            // Clear all existing documents from the database
            await Promise.all([User.deleteMany(), Thought.deleteMany()]);

            // Seed the database with new documents
            const [users, thoughts] = [getUsers(), getThoughts()];
            const userThoughts = users.map((user, index) => ({
                ...user,
                thoughts: [thoughts[index]._id],
            }));
            await Promise.all([
                User.insertMany(userThoughts),
                Thought.insertMany(thoughts),
            ]);

            console.table(userThoughts);
            console.info(`DB Seeded!`);
        });
    } catch (err) {
        console.error(`DB Seeding failed: ${err}`);
    } finally {
        await connection.close();
        process.exit();
    }
};

seedDatabase();
