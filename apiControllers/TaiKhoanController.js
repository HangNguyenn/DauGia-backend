var express = require('express');
var axios = require('axios');
var md5= require('md5');
var sequelize = require('sequelize');
var router = express.Router();
var taikhoan = require('../schemas').taikhoan;





router.post('/login', (req, res) => {
	let userName = req.body.TenTK;
	let password = req.body.MatKhau;
	taikhoan
		.findOne({ where: { TenTK: userName } })
		.then((tk) => {
			if (!tk) {
				res.status(401).json({ message: "nouser" });
				return;
			}

			var md5_pass= md5(password);

			if (tk.MatKhau != md5_pass) {
				res.status(401).json({ message: "wrongpass" });
				return;
			}

			res.json({ TenTK: tk.TenTK, LoaiTK: tk.LoaiTK, TinhTrang: tk.TinhTrang, Gmail: tk.Gmail});
		})
		.catch((error) => {
			res.status(500).json({ message: "Internal error" });
		})
});

router.post('/register', (req, res) => {
	let userName = req.body.TenTK;
	let password = req.body.MatKhau;
	let useremail = req.body.Gmail;
	taikhoan
		.findOne({ where: { TenTK: userName } })
		.then((tk) => {
			if (tk != null) {
				res.status(401).json({ message: "user already exist" });
				return;
			}

			taikhoan.create({
				TenTK: userName,
				MatKhau: md5(password),
				LoaiTK: '0',
				TinhTrang: 'chuakichhoat',
				Gmail: useremail
			})
				.then((temp) => {
					res.json({ MaTK: temp.MaTK, TenTK: temp.TenTK, LoaiTK: temp.LoaiTK, Gmail: temp.Gmail });
				})
				.catch((error) => {
					res.status(500).json({ message: "Internal error" });
					res.end();
				})
		})
		.catch((error) => {
			res.status(500).json({ message: "Internal error" });
			res.end();
		})
});

router.post('/update', (req, res) => {
	let password = req.body.MatKhau;
	let useremail = req.body.Gmail;
	taikhoan
		.findOne({ where: { Gmail: useremail } })
		.then((tk) => {
			if (tk == null) {
				res.status(404).json({ message: "No such user" });
				return;
			}

			taikhoan.update({ MatKhau: password },
				{
					where: { Gmail: useremail }
				})
				.then((temp) => { 
					res.status(200).json({ affectedRows: temp });
					res.end();

				})
				.catch((error) => {
					res.status(500).json({ message: "Internal error" });
					res.end();
				})
		})
		.catch((error) => {
			res.status(500).json({ message: "Internal error" });
			res.end();
		})
});

router.post('/captcha', (req, res) => {
	var secret = '6LcZVl4UAAAAACChWdLwTbjaGpUyluaSfd_zsegf';
	var captcha_response = req.body.captcha_response;

	var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha_response}`;
	axios.post(url, {

	}, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
		}
	})
	.then(function(response) {
		res.json(response.data);
	})
	.catch(function(error) {
		res.end('fail');
	});
});
module.exports = router;