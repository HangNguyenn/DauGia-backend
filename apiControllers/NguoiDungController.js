var express = require('express');
var axios = require('axios');

var sequelize = require('sequelize');
var router = express.Router();
var nguoidung = require('../schemas').nguoidung;

router.get('/loadall', (req, res) => {
    nguoidung.findAll()
        .then(rows => {
            res.status(200).json(rows);
            return;
        })
        .catch(err => {
            res.status(500).json({ message: "Internal error" });
            return;
        })
})

router.post('/add', (req, res) => {
    let matk = req.body.MaTK;
    let sdt = req.body.SDT;
    let diachi = req.body.DiaChi;
    let hoten = req.body.HoTen;
    let mail = req.body.Gmail;
    nguoidung.findOne(
        { where: { [sequelize.Op.or]: [{ SDT: sdt }, { Gmail: mail}] }})
        .then(nd => {
            if (nd != null) {
                res.status(401).json({ message: "user or email already exist" });
                return;
            }
            nguoidung.create({
                MaTK: matk,
                SDT: sdt,
                DiaChi: diachi,
                HoTen: hoten,
                Gmail: mail,
                DiemDanhGia: 0,
                ThoiHan: 0
            })
            .then(temp => {
                res.status(200).json({ MaTK: temp.MaTK, SDT: temp.SDT, DiaChi: temp.DiaChi, HoTen: temp.HoTen, Gmail: temp.Gmail, DiemDanhGia: temp.DiemDanhGia, ThoiHan: temp.ThoiHan });
                return;
            })
            .catch(err => {
                res.status(500).json({ message: err});
                return;
            })
        })
        .catch((error) => {
			res.status(500).json({ error });
			res.end();
		})
});



module.exports = router;