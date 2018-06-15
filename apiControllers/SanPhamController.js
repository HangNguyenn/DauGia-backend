var express = require('express');
var axios = require('axios');
var md5 = require('md5');
var sequelize = require('sequelize');
var router = express.Router();
var sanpham = require('../schemas').sanpham;
var nguoidung = require('../schemas').nguoidung;

var cn = new sequelize('dau_gia', 'root', '1234567890', {
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


router.get('/loadall', (req, res) => {
    cn.query('SELECT sp.*, nd1.HoTen as TenNguoiDang, nd2.HoTen as TenNguoiGiuGia, dm.TenDM, ha.HinhAnh1 FROM sanpham sp, nguoidung nd1, nguoidung nd2, danhmuc dm, hinhanh ha WHERE sp.MaNguoiDang = nd1.MaTK and sp.NguoiDangGiuGia = nd2.MaTK and sp.DanhMuc = dm.MaDM and sp.MaSP = ha.MaSP', { raw: true })
        .then(rows => {
            res.status(200).json(rows);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
});
router.get('/top5LuotRaGia', (req, res) => {
    cn.query('SELECT sp.*, nd1.HoTen as TenNguoiDang, nd2.HoTen as TenNguoiGiuGia, dm.TenDM, ha.HinhAnh1 FROM sanpham sp, nguoidung nd1, nguoidung nd2, danhmuc dm, hinhanh ha WHERE sp.MaNguoiDang = nd1.MaTK and sp.NguoiDangGiuGia = nd2.MaTK and sp.DanhMuc = dm.MaDM and sp.MaSP = ha.MaSP', { raw: true })
        .then(rows => {
            res.status(200).json(rows);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
});


module.exports = router;



//sp.MaSP, sp.MaNguoiDang, nd1.TenTK as TenNguoiDang, sp.TenSP, sp.DanhMuc, dm.TenDM, sp.GiaHienTai, sp.GiaMuaNgay, sp.NguoiDangGiuGia, nd2.TenTK as TenNguoiGiuGia, sp.ThoiGianDang, sp.ThoiGianKetThuc, sp.SoLuotRaGia, sp.GiaKhoiDiem, sp.BuocGia, sp.TuDongGiaHan