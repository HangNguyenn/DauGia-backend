var express= require('express'),
    morgan= require('morgan'),
    cors= require('cors'),
    bodyParser= require('body-parser');

var sql= require('./fn/mysql-db'),
    DanhMucCtrl= require('./apiControllers/DanhMucController'),
    TaiKhoanCtrl= require('./apiControllers/TaiKhoanController'),
    NguoiDungCtrl= require('./apiControllers/NguoiDungController');
    SanPhamCtrl= require('./apiControllers/SanPhamController');
var app= express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


app.use('/TaiKhoan',TaiKhoanCtrl);
app.use('/DanhMuc', DanhMucCtrl);
app.use('/NguoiDung', NguoiDungCtrl);
app.use('/SanPham', SanPhamCtrl);

app.listen(3000,()=>{
    console.log('API running port 3000')
})
