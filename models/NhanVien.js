var NhanVien = function(){
    this.maNhanVien = '';
    this.tenNhanVien='';
    this.luongCoBan ='';
    this.chucVu = '';
    this.soGioLamTrongThang ='';
    this.heSoChucVu = '';
    this.tinhTongLuong = function(){
        return this.luongCoBan * this.heSoChucVu;
    },
    this.xepLoaiNhanVien = function(){
        if (this.soGioLamTrongThang >= 120) {
            return 'Nhân Viên Xuất Sắc';
        } else if (this.soGioLamTrongThang >= 100){
            return 'Nhân Viên Giỏi';
        } else if (this.soGioLamTrongThang >= 80) {
            return 'Nhân Viên Khá';
        } else if (this.soGioLamTrongThang >= 50) {
            return 'Nhân Viên Trung Bình';
        } else {
            return 'Không xác định';
        }
    }
}