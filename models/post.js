module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "This is test desciption"
        },
        userId: {
            type: DataTypes.INTEGER
        }
    });
    return Posts;
}