var express = require('express');
var axios = require('axios');

var sequelize = require('sequelize');
var router = express.Router();
var danhmuc = require('../schemas').danhmuc;


router.get('/', (req, res) => {
    danhmuc.findAll()
        .then(rows => {
            res.json(rows);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Internal error" });
            res.end();
        })
})
router.post('/add', (req, res) => {
    let tendanhmuc = req.body.TenDM;
    danhmuc.findOne({ where: { TenDM: tendanhmuc } })
        .then(dm => {
            if (dm != null) {
                res.status(401).json({ message: "categorige already exist" })
                return;
            }
            danhmuc.create({
                TenDM: tendanhmuc
            }).then(temp => {
                res.status(200).json({ MaDM: temp.MaDM, TenDM: temp.TenDM });
                return;
            })
                .catch(err => {
                    res.status(500).json({ message: "Internal error " });
                    return;
                })
        })
})
router.post('/update', (req, res) => {
    let tendmcu = req.body.TenDMcu;
    let tendmmoi = req.body.TenDMmoi;
    danhmuc.findOne({ where: { TenDM: tendmcu } })
        .then(dm => {
            if (dm == null) {
                res.status(404).json({ message: "Not found categorige" })
                return;
            }
            danhmuc.update({
                TenDM: tendmmoi
            }, {
                    where: { MaDM: dm.MaDM }
                }).then(temp => {
                    res.status(200).json({ affectedRows: temp });
                    return;
                })
                .catch(err => {
                    res.status(500).json({ message: "Internal error" })
                    return;
                })
        })
})

// var express= require('express');


// var router= express.Router();

// router.get('/',(req, res)=>{
//     DanhMucRepo.loadAll().then(rows=>{
//         res.json(rows);
//     }).catch(err=>{
//         console.log(err);
//         res.statusCode=500;
//         res.end('error')
//     })
// })

// router.get('/:id', (req, res) => {
// 	if (req.params.id) {
// 		var id = req.params.id;

// 		if (isNaN(id)) {
// 			res.statusCode = 400;
// 			res.end();
// 			return;
// 		}

// 		DanhMucRepo.load(id).then(rows => {
// 			if (rows.length > 0) {
// 				res.json(rows[0]);
// 			} else {
// 				res.statusCode = 204;
// 				res.end();
// 			}
// 		}).catch(err => {
// 			console.log(err);
// 			res.statusCode = 500;
// 			res.json('error');
// 		});
// 	} else {
// 		res.statusCode = 400;
// 		res.json('error');
// 	}
// });


// router.post('/', (req, res) => {
// 	DanhMucRepo.add(req.body)
// 		.then(insertId => {
// 			var dm = {
// 				MaDM: insertId,
// 				TenDM: req.body.TenDM
// 			};
// 			res.statusCode = 201;
// 			res.json(dm);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.statusCode = 500;
// 			res.end();
// 		});
// });

// router.post('/:id', (req, res) => {
//     if (req.params.id) {
// 		var id = req.params.id;

// 		if (isNaN(id)) {
// 			res.statusCode = 400;
// 			res.end();
// 			return;
// 		}

//         DanhMucRepo.update(req.body)
// 		    .then(changedRows => {            
//                     res.json({
//                     changedRows: changedRows
//                     });

// 			// var dm = {
// 			// 	MaDM: req.body.MaDM,
// 			// 	TenDM: req.body.TenDM
//             // };
//             // console.log(dm);
// 			res.statusCode = 201;
// 			// res.json(dm);
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.statusCode = 500;
// 			res.end();
// 		});
// 	} else {
// 		res.statusCode = 400;
// 		res.json('error');
// 	}


// });

// router.delete('/:id', (req, res) => {
// 	if (req.params.id) {
// 		var id = req.params.id;

// 		if (isNaN(id)) {
// 			res.statusCode = 400;
// 			res.end();
// 			return;
// 		}

// 		DanhMucRepo.delete(id).then(affectedRows => {
// 			res.json({
// 				affectedRows: affectedRows
// 			});
// 		}).catch(err => {
// 			console.log(err);
// 			res.statusCode = 500;
// 			res.json('error');
// 		});
// 	} else {
// 		res.statusCode = 400;
// 		res.json('error');
// 	}
// });




module.exports = router;