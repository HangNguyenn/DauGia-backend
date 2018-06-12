var Sequelize = require('sequelize');

var cn = new Sequelize('dau_gia', 'root', '1234567890', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    taikhoan: cn.import('./models/taikhoan.js'),
    danhmuc: cn.import('./models/danhmuc.js'),
    //sanpham: cn.import('./models/sanpham.js'),
    nguoidung: cn.import('./models/nguoidung.js')
}