const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('new_sequelize_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // optional
    pool: { max: 5, min: 0, idle: 10000 }
});

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("connected");
    } catch (err) {
        console.log(err.message)
    }
}
connection();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users')(sequelize,DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log("re-sync done")
    });

module.exports = db;