/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('taikhoan', {
      MaTK: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      TenTK: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      MatKhau:{
        type: DataTypes.STRING(50),
        allowNull: false
      },
      LoaiTK:{
        type: DataTypes.STRING(50),
        allowNull: false
      },
      TinhTrang:{
        type: DataTypes.STRING(50),
        allowNull: false
      },
      Gmail:{
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      tableName: 'taikhoan',
      timestamps: false,
      createdAt: false,
      updatedAt: false
    });
  };
  