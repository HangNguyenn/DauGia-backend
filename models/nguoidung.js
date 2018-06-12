module.exports = function (sequelize, DataTypes) {
    return sequelize.define('nguoidung', {
        MaTK: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true
        },
        SDT: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        DiaChi: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        HoTen: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Gmail: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        DiemDanhGia: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: null
        },
        ThoiHan: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true,
            defaultValue: 0
        }
    }, {
            tableName: 'nguoidung',
            timestamps: false,
            createdAt: false,
            updatedAt: false
        })
};