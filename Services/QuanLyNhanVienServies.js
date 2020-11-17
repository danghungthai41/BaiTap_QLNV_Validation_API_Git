//Service là nơi chứa các phương thức tương tác với backend
var QuanLyNhanVienSerVices = function(){
    this.layDanhSachNhanVien = function(){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
            method: 'GET',
        });
        return promise;
    }
    this.layThongTinNhanVien = function(maNhanVien){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVien,
            method: 'GET',
        })
        return promise;
    }
    this.capNhatThongTinNhanVien = function(nv){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nv.maNhanVien,
            method: 'PUT',
            data: nv
        })
        return promise;
    }
    this.themNhanVien = function(nv){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
            method: 'POST',
            data: nv
        })
        return promise;
    }
    this.xoaNhanVien = function(maNV){
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNV,
            method: 'DELETE',
        })
        return promise;
    }
}