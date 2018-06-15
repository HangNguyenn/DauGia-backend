module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sanpham', {
        MaSP: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        MaNguoiDang: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            primaryKey: true
        },
        TenSP: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '0'
        },
        DanhMuc: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        GiaHienTai: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        GiaMuaNgay: {
            type: DataTypes.DOUBLE,
            allowNull: true,
            defaultValue: null
        },
        NguoiDangGiuGia: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true,
            defaultValue: null
        },
        ThoiGianDang: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ThoiGianKetThuc: {
            type: DataTypes.DATE,
            allowNull: false
        },
        SoLuotRaGia: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        GiaKhoiDiem: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0
        },
        BuocGia: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        TuDongGiaHan: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    }, {
            tableName: 'sanpham',
            timestamps: false,
            createdAt: false,
            updatedAt: false
        }
    )
};
