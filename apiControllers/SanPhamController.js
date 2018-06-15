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
    cn.query('SELECT sp.*, tk1.TenTK AS TenNguoiDang, tk2.TenTK AS TenNguoiGiuGia, ha.HinhAnh1 FROM sanpham sp LEFT JOIN taikhoan tk2 ON sp.NguoiDangGiuGia = tk2.MaTK, taikhoan tk1, hinhanh ha WHERE sp.MaNguoiDang = tk1.MaTK AND sp.MaSP = ha.maSP', { raw: true })
        .then(rows => {
            console.log(rows[0])
            res.status(200).json(rows[0]);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
});
router.get('/top5LuotRaGia', (req, res) => {
    cn.query('SELECT sp.*, tk1.TenTK AS TenNguoiDang, tk2.TenTK AS TenNguoiGiuGia, ha.HinhAnh1 FROM sanpham sp LEFT JOIN taikhoan tk2 ON sp.NguoiDangGiuGia = tk2.MaTK, taikhoan tk1, hinhanh ha WHERE sp.MaNguoiDang = tk1.MaTK AND sp.MaSP = ha.maSP order by sp.SoLuotRaGia DESC', { raw: true, limit: 5 })
        .then(rows => {
            res.status(200).json(rows[0]);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
});
router.get('/top5SPGiaCaoNhat', (req, res) => {
    cn.query('SELECT sp.*, tk1.TenTK AS TenNguoiDang, tk2.TenTK AS TenNguoiGiuGia, ha.HinhAnh1 FROM sanpham sp LEFT JOIN taikhoan tk2 ON sp.NguoiDangGiuGia = tk2.MaTK, taikhoan tk1, hinhanh ha WHERE sp.MaNguoiDang = tk1.MaTK AND sp.MaSP = ha.maSP order by sp.GiaHienTai DESC', { raw: true, limit: 5 })
        .then(rows => {
            res.status(200).json(rows[0]);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
});
router.get('/top5SPGanKetThuc', (req, res) => {
    cn.query('SELECT sp.*, tk1.TenTK AS TenNguoiDang, tk2.TenTK AS TenNguoiGiuGia, ha.HinhAnh1 FROM sanpham sp LEFT JOIN taikhoan tk2 ON sp.NguoiDangGiuGia = tk2.MaTK, taikhoan tk1, hinhanh ha WHERE sp.MaNguoiDang = tk1.MaTK AND sp.MaSP = ha.maSP order by (sp.ThoiGianKetThuc - sp.ThoiGianDang) ASC', { raw: true, limit: 5 })
        .then(rows => {
            res.status(200).json(rows[0]);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
});

router.post('/lichSuMoTa', (req, res) => {
   let masp = req.body.MaSP;
    cn.query('SELECT * FROM motasanpham where MaSP = ?', { raw: true, replacements: [masp]})
        .then(rows => {
            res.status(200).json(rows[0]);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
})

router.post('/lichSuDauGia', (req, res) => {
    let masp = req.body.MaSP;
     cn.query('SELECT * FROM lichsudaugiasanpham where MaSP = ?', { raw: true, replacements: [masp]})
         .then(rows => {
             res.status(200).json(rows[0]);
             return;
         })
         .catch(err => {
             res.status(500).json({ message: "Internal error" });
             return;
         })
 })
module.exports = router;

//sp.MaSP, sp.MaNguoiDang, nd1.TenTK as TenNguoiDang, sp.TenSP, sp.DanhMuc, dm.TenDM, sp.GiaHienTai, sp.GiaMuaNgay, sp.NguoiDangGiuGia, nd2.TenTK as TenNguoiGiuGia, sp.ThoiGianDang, sp.ThoiGianKetThuc, sp.SoLuotRaGia, sp.GiaKhoiDiem, sp.BuocGia, sp.TuDongGiaHan