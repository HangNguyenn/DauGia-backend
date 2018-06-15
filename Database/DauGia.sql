-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.22-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dau_gia
CREATE DATABASE IF NOT EXISTS `dau_gia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `dau_gia`;

-- Dumping structure for table dau_gia.danhmuc
CREATE TABLE IF NOT EXISTS `danhmuc` (
  `MaDM` int(11) NOT NULL AUTO_INCREMENT,
  `TenDM` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaDM`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.danhmuc: ~8 rows (approximately)
/*!40000 ALTER TABLE `danhmuc` DISABLE KEYS */;
INSERT INTO `danhmuc` (`MaDM`, `TenDM`) VALUES
	(1, 'Phụ kiện'),
	(2, '11C'),
	(3, 'Quần áo người lớn'),
	(4, 'Laptop'),
	(5, 'Quần áo trẻ em'),
	(6, 'Giày dép'),
	(8, 'Điện thoại');
/*!40000 ALTER TABLE `danhmuc` ENABLE KEYS */;

-- Dumping structure for table dau_gia.dsnguoibandangsp
CREATE TABLE IF NOT EXISTS `dsnguoibandangsp` (
  `MaTK` int(11) NOT NULL,
  `MaSP` int(11) NOT NULL,
  `TinhTrang` int(11) NOT NULL,
  `NguoiMua` int(11) NOT NULL,
  `DanhGia` int(11) NOT NULL,
  `NhanXet` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaTK`,`MaSP`),
  KEY `FK_DSNBanDangSP_sanpham` (`MaSP`),
  KEY `FK_DSNBanDangSP_nguoimua` (`NguoiMua`),
  CONSTRAINT `FK_DSNBanDangSP_nguoidung` FOREIGN KEY (`MaTK`) REFERENCES `nguoidung` (`MaTK`),
  CONSTRAINT `FK_DSNBanDangSP_nguoimua` FOREIGN KEY (`NguoiMua`) REFERENCES `nguoidung` (`MaTK`),
  CONSTRAINT `FK_DSNBanDangSP_sanpham` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.dsnguoibandangsp: ~0 rows (approximately)
/*!40000 ALTER TABLE `dsnguoibandangsp` DISABLE KEYS */;
/*!40000 ALTER TABLE `dsnguoibandangsp` ENABLE KEYS */;

-- Dumping structure for table dau_gia.dsspdaugianguoidung
CREATE TABLE IF NOT EXISTS `dsspdaugianguoidung` (
  `MaTK` int(11) NOT NULL,
  `MaSP` int(11) NOT NULL,
  `TrangThai` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DanhGia` int(11) NOT NULL DEFAULT '0',
  `NhanXet` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MaTK`,`MaSP`),
  KEY `FK_DSSPdaugianguoidung_sanpham` (`MaSP`),
  CONSTRAINT `FK_DSSPdaugianguoidung_nguoidung` FOREIGN KEY (`MaTK`) REFERENCES `nguoidung` (`MaTK`),
  CONSTRAINT `FK_DSSPdaugianguoidung_sanpham` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.dsspdaugianguoidung: ~0 rows (approximately)
/*!40000 ALTER TABLE `dsspdaugianguoidung` DISABLE KEYS */;
/*!40000 ALTER TABLE `dsspdaugianguoidung` ENABLE KEYS */;

-- Dumping structure for table dau_gia.hinhanh
CREATE TABLE IF NOT EXISTS `hinhanh` (
  `maSP` int(11) NOT NULL,
  `HinhAnh1` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HinhAnh2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HinhAnh3` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`maSP`),
  CONSTRAINT `FK_hinhanh_sanpham` FOREIGN KEY (`maSP`) REFERENCES `sanpham` (`MaSP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.hinhanh: ~0 rows (approximately)
/*!40000 ALTER TABLE `hinhanh` DISABLE KEYS */;
INSERT INTO `hinhanh` (`maSP`, `HinhAnh1`, `HinhAnh2`, `HinhAnh3`) VALUES
	(1, '1_1', NULL, NULL),
	(2, '2_1', NULL, NULL),
	(3, '3_1', NULL, NULL),
	(4, '4_1', NULL, NULL);
/*!40000 ALTER TABLE `hinhanh` ENABLE KEYS */;

-- Dumping structure for table dau_gia.lichsudaugiasanpham
CREATE TABLE IF NOT EXISTS `lichsudaugiasanpham` (
  `MaSP` int(11) NOT NULL,
  `MaNguoiDauGia` int(11) NOT NULL,
  `ThoiGian` datetime NOT NULL,
  `Gia` double NOT NULL,
  `DauGiaTuDong` int(11) NOT NULL,
  `GiaMax` double DEFAULT NULL,
  PRIMARY KEY (`MaSP`,`MaNguoiDauGia`),
  KEY `FK_lsdaugiacuasp_nguoidaugia` (`MaNguoiDauGia`),
  CONSTRAINT `FK_lsdaugiacuasanpham_sanpham` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`),
  CONSTRAINT `FK_lsdaugiacuasp_nguoidaugia` FOREIGN KEY (`MaNguoiDauGia`) REFERENCES `nguoidung` (`MaTK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.lichsudaugiasanpham: ~0 rows (approximately)
/*!40000 ALTER TABLE `lichsudaugiasanpham` DISABLE KEYS */;
/*!40000 ALTER TABLE `lichsudaugiasanpham` ENABLE KEYS */;

-- Dumping structure for table dau_gia.motasanpham
CREATE TABLE IF NOT EXISTS `motasanpham` (
  `MaSP` int(11) NOT NULL,
  `NgayGioDang` datetime NOT NULL,
  `MoTa` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaSP`,`NgayGioDang`),
  CONSTRAINT `FK_motasp_sanpham` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.motasanpham: ~0 rows (approximately)
/*!40000 ALTER TABLE `motasanpham` DISABLE KEYS */;
INSERT INTO `motasanpham` (`MaSP`, `NgayGioDang`, `MoTa`) VALUES
	(1, '2018-06-16 04:11:08', 'Thiết kế "tai thỏ"Huawei Nova 3e sở hữu thiết kế thời thượng nhất hiện nay với phần viền màn hình được làm cực mỏng đến cả cạnh trên của máy, tạo nên hình dáng "tai thỏ" tương tự như iPhone X, rất đẹp và độc đáo.'),
	(2, '2018-06-16 04:12:22', 'chuyên gia selfie mới nổi bật với màn hình tràn cạnh thời trang và camera tích hợp trí tuệ nhân tạo AI để càng chụp càng đẹp.'),
	(3, '2018-06-16 04:13:21', 'Tiếp nối sự thành công của OPPO F5 thì OPPO tiếp tục tung ra OPPO F7 với điểm nhấn vẫn là camera selfie và thiết kế "tai thỏ độc đáo".');
/*!40000 ALTER TABLE `motasanpham` ENABLE KEYS */;

-- Dumping structure for table dau_gia.nguoidung
CREATE TABLE IF NOT EXISTS `nguoidung` (
  `MaTK` int(11) NOT NULL,
  `SDT` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DiaChi` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HoTen` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Gmail` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DiemDanhGia` int(11) DEFAULT NULL,
  `ThoiHan` int(11) unsigned DEFAULT '0',
  PRIMARY KEY (`MaTK`),
  CONSTRAINT `FK_taikhoan_nguoidung` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`MaTK`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.nguoidung: ~6 rows (approximately)
/*!40000 ALTER TABLE `nguoidung` DISABLE KEYS */;
INSERT INTO `nguoidung` (`MaTK`, `SDT`, `DiaChi`, `HoTen`, `Gmail`, `DiemDanhGia`, `ThoiHan`) VALUES
	(5, '09273824782', '23 Nguyễn Trãi, Quận 5', 'Nguyễn Văn An', 'nvan@gmail.com', 0, 4),
	(12, '01225533354', '123 trần hưng đạo', 'Võ Văn Hiếu', 'vvh@gmail.com', 0, 0),
	(13, '01222938390', '456 nguyễn văn cừ', 'Trần Văn Dũng', 'tvd@gmail.com', 0, 7),
	(19, '01235742890', '90 nguyễn thị minh khai', 'Nguyễn Thị Thúy Hằng', 'ntthang@gmail.com', 0, 7),
	(20, '01257893902', '50 Thành Thái, Quận 10', 'Phạm Thị Hậu', 'pthau@gmail.com', 0, 0),
	(23, '01256979089', '79 Nguyễn Thái Học', 'Nguyễn Văn Bình', 'nvbinh@gmail.com', 0, 0);
/*!40000 ALTER TABLE `nguoidung` ENABLE KEYS */;

-- Dumping structure for table dau_gia.sanpham
CREATE TABLE IF NOT EXISTS `sanpham` (
  `MaSP` int(11) NOT NULL AUTO_INCREMENT,
  `MaNguoiDang` int(11) NOT NULL DEFAULT '0',
  `TenSP` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `DanhMuc` int(11) NOT NULL DEFAULT '0',
  `GiaHienTai` double NOT NULL DEFAULT '0',
  `GiaMuaNgay` double DEFAULT '0',
  `NguoiDangGiuGia` int(11) DEFAULT NULL,
  `ThoiGianDang` datetime NOT NULL,
  `ThoiGianKetThuc` datetime NOT NULL,
  `SoLuotRaGia` int(11) NOT NULL DEFAULT '0',
  `GiaKhoiDiem` double NOT NULL DEFAULT '0',
  `BuocGia` double NOT NULL DEFAULT '0',
  `TuDongGiaHan` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`MaSP`,`MaNguoiDang`),
  KEY `FK_sanpham_nguoidung` (`MaNguoiDang`),
  KEY `FK_sanpham_nguoigiugia` (`NguoiDangGiuGia`),
  KEY `FK_sanpham_danhmuc` (`DanhMuc`),
  CONSTRAINT `FK_sanpham_danhmuc` FOREIGN KEY (`DanhMuc`) REFERENCES `danhmuc` (`MaDM`),
  CONSTRAINT `FK_sanpham_nguoidung` FOREIGN KEY (`MaNguoiDang`) REFERENCES `nguoidung` (`MaTK`),
  CONSTRAINT `FK_sanpham_nguoigiugia` FOREIGN KEY (`NguoiDangGiuGia`) REFERENCES `nguoidung` (`MaTK`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.sanpham: ~1 rows (approximately)
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` (`MaSP`, `MaNguoiDang`, `TenSP`, `DanhMuc`, `GiaHienTai`, `GiaMuaNgay`, `NguoiDangGiuGia`, `ThoiGianDang`, `ThoiGianKetThuc`, `SoLuotRaGia`, `GiaKhoiDiem`, `BuocGia`, `TuDongGiaHan`) VALUES
	(1, 13, 'Điện thoại Hawai 3e', 8, 3000000, 9000000, 12, '2018-06-13 14:41:42', '2018-06-13 14:41:45', 1, 2500000, 500000, 0),
	(2, 5, 'Oppo 5s', 8, 4000000, NULL, 20, '2018-06-15 23:31:03', '2018-06-20 23:31:15', 4, 3500000, 500000, 0),
	(3, 19, 'IPhone 7s', 8, 12000000, 15000000, 13, '2018-06-15 23:33:19', '2018-06-19 23:33:20', 2, 11500000, 500000, 0),
	(4, 13, 'Dell Inspiron i3 3467', 4, 11000000, 14000000, NULL, '2018-06-15 23:35:49', '2018-06-22 23:35:51', 0, 10500000, 600000, 0);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;

-- Dumping structure for table dau_gia.spndyeuthich
CREATE TABLE IF NOT EXISTS `spndyeuthich` (
  `MaTK` int(11) NOT NULL,
  `MaSP` int(11) NOT NULL,
  PRIMARY KEY (`MaTK`,`MaSP`),
  KEY `FK_SPNDyeuthich_sanpham` (`MaSP`),
  CONSTRAINT `FK_SPNDyeuthich_nguoidung` FOREIGN KEY (`MaTK`) REFERENCES `nguoidung` (`MaTK`),
  CONSTRAINT `FK_SPNDyeuthich_sanpham` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.spndyeuthich: ~0 rows (approximately)
/*!40000 ALTER TABLE `spndyeuthich` DISABLE KEYS */;
/*!40000 ALTER TABLE `spndyeuthich` ENABLE KEYS */;

-- Dumping structure for table dau_gia.taikhoan
CREATE TABLE IF NOT EXISTS `taikhoan` (
  `MaTK` int(11) NOT NULL AUTO_INCREMENT,
  `TenTK` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MatKhau` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `LoaiTK` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TinhTrang` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Gmail` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaTK`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table dau_gia.taikhoan: ~10 rows (approximately)
/*!40000 ALTER TABLE `taikhoan` DISABLE KEYS */;
INSERT INTO `taikhoan` (`MaTK`, `TenTK`, `MatKhau`, `LoaiTK`, `TinhTrang`, `Gmail`) VALUES
	(1, 'admin', '202cb962ac59075b964b07152d234b70', 'admin', 'kichhoat', 'admin@gmail.com'),
	(5, 'nvan123', '202cb962ac59075b964b07152d234b70', '0', 'chuakichhoat', 'nguyenvanan@gmail.com'),
	(12, 'vvh', '202cb962ac59075b964b07152d234b70', '0', 'kichhoat', 'vvh@gmail.com'),
	(13, 'tvd', '202cb962ac59075b964b07152d234b70', '0', 'kichhoat', 'tvd@gmail.com'),
	(19, 'ntthang', 'e10adc3949ba59abbe56e057f20f883e', '0', 'kichhoat', 'ntthang@gmail.com'),
	(20, 'pthau', 'e10adc3949ba59abbe56e057f20f883e', '0', 'kichhoat', 'pthau@gmail.com'),
	(21, 'nkhau', 'e10adc3949ba59abbe56e057f20f883e', '0', 'kichhoat', 'nkhau@gmail.com'),
	(22, 'ntkhuyen', 'e10adc3949ba59abbe56e057f20f883e', '0', 'kichhoat', 'ntkhuyen@gmail.com'),
	(23, 'nvbinh', 'e10adc3949ba59abbe56e057f20f883e', '0', 'kichhoat', 'nvbinh@gmail.com'),
	(24, 'tttanh', 'e10adc3949ba59abbe56e057f20f883e', '0', 'kichhoat', 'tttanh@gmail.com');
/*!40000 ALTER TABLE `taikhoan` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
