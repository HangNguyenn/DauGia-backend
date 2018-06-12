module.exports = function (sequelize, DataTypes) {
    return sequelize.define('danhmuc', {
        MaDM: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        TenDM: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
            tableName: 'danhmuc',
            timestamps: false,
            createdAt: false,
            updatedAt: false
    });
};