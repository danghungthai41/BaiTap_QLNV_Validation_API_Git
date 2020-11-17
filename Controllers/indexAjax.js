var svService = new QuanLyNhanVienSerVices();
var validate = new Validation();

var getSelect = function (id) {
    return document.querySelector(id);
}
var loadDuLieuNhanVien = function () {
    var promise = svService.layDanhSachNhanVien();
    promise.then(function (result) {
        console.log(result.data);
        renderTableNhanVien(result.data);
    })
    promise.catch(function (err) {
        console.log(err.result.data);
    })
    return promise;
}

var renderTableNhanVien = function (arrayNhanVien) {
    var noiDungTable = '';
    // console.log(arrayNhanVien);
    for (var index = 0; index < arrayNhanVien.length; index++) {
        var nv = new NhanVien();
        nv.maNhanVien = arrayNhanVien[index].maNhanVien;
        nv.tenNhanVien = arrayNhanVien[index].tenNhanVien;
        nv.chucVu = arrayNhanVien[index].chucVu;
        nv.luongCoBan = arrayNhanVien[index].luongCoBan;
        nv.soGioLamTrongThang = arrayNhanVien[index].soGioLamTrongThang;
        nv.heSoChucVu = arrayNhanVien[index].heSoChucVu;

        noiDungTable += `
            <tr>    
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhTongLuong()}</td>
                <td>${nv.soGioLamTrongThang}</td>
                <td>${nv.xepLoaiNhanVien()}</td>
                <td>
                    <button class = "btn btn-danger" onclick = "xoaNhanVien('${nv.maNhanVien}')">Xoá</button>
                </td>
                <td>
                    <button class = "btn btn-success" onclick = "chinhSuaThongTin('${nv.maNhanVien}')">Chỉnh Sửa</button>
                </td>
            </tr>
        `
    }
    getSelect('#addBody').innerHTML = noiDungTable;
}

//Thêm Nhân Viên
getSelect('#btnXacNhan').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = getSelect('#maNhanVien').value;
    nv.tenNhanVien = getSelect('#tenNhanVien').value;
    var mangChucVu = getSelect('#chucVu').options;
    var viTriChucVu = getSelect('#chucVu').selectedIndex;
    nv.chucVu = mangChucVu[viTriChucVu].innerHTML;
    // nv.chucVu = getSelect('#chucVu').value;
    nv.soGioLamTrongThang = getSelect('#gioLamTrongThang').value;
    nv.luongCoBan = getSelect('#luongCoBan').value;
    nv.heSoChucVu = getSelect('#chucVu').value;
    // nv.soGioLamTrongThang = parseInt(nv.soGioLamTrongThang);
    // nv.luongCoBan = parseInt(nv.luongCoBan);
    // console.log(mangChucVu);
    // console.log(viTriChucVu);
    //     console.log(nv);
    
    //KIỂM TRA RỖNG
    var valid = true;

    valid &= validate.kiemTraRong(nv.maNhanVien, 'Mã nhân viên', '#kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, 'Tên nhân viên','#kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '#kiemTraRong-luongCoBan') & validate.kiemTraRong(nv.soGioLamTrongThang, 'Giờ làm trong tháng','#kiemTraRong-gioLamTrongThang');
    //Kiểm tra định dạng & Số & Chữ & & Giá trị
    valid &= validate.kiemTraDoDai(nv.maNhanVien, 'Mã nhân viên', '#kiemTraDoDai-maNhanVien',4,6) & validate.kiemTraTatCaLaSo(nv.maNhanVien, 'Mã nhân viên', '#kiemTraDinhDang-maNhanVien');

    valid &= validate.kiemTraTatCaLaKyTu(nv.tenNhanVien, 'Tên nhân viên', '#kiemTraDinhDang-tenNhanVien');

    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '#kiemTraGiaTri-luongCoBan',1000000,20000000) & validate.kiemTraTatCaLaSo(nv.luongCoBan, 'Lương cơ bản', '#kiemTraDinhDang-luongCoBan');

    valid &= validate.kiemTraGiaTri(nv.soGioLamTrongThang, 'Giờ làm trong tháng', '#kiemTraGiaTri-gioLamTrongThang',50,150) & validate.kiemTraTatCaLaSo(nv.soGioLamTrongThang, 'Giờ làm trong tháng', '#kiemTraDinhDang-gioLamTrongThang');
    if(!valid){
        return;
    }
    
    var promise = svService.themNhanVien(nv);
    promise.then(function (result) {
        console.log(result.data);
        loadDuLieuNhanVien(result.data);
    })
    promise.catch(function (err) {
        console.log(err.result.data);
    })
}

//Xoá Nhân Viên
var xoaNhanVien = function (maNV) {
    var promise = svService.xoaNhanVien(maNV);
    promise.then(function (result) {
        console.log(result.data);
        loadDuLieuNhanVien(result.data);
    })
    promise.catch(function (err) {
        console.log(err);
    })
}

//Chỉnh sửa thông tin
var chinhSuaThongTin = function (maNhanVien) {
    var promise = svService.layThongTinNhanVien(maNhanVien);
    promise.then(function (result) {
        console.log(result.data);
        var nvUpdated = result.data;
        getSelect('#maNhanVien').value = nvUpdated.maNhanVien;
        getSelect('#tenNhanVien').value = nvUpdated.tenNhanVien;
        getSelect('#chucVu').value = nvUpdated.heSoChucVu;
        getSelect('#luongCoBan').value = nvUpdated.luongCoBan;
        getSelect('#gioLamTrongThang').value = nvUpdated.soGioLamTrongThang;
        // getSelect('#btnXacNhan').disabled = true;
        getSelect('#maNhanVien').disabled = true;
        getSelect('#btnLuuThongTin').disabled = false;
        // console.log(nvUpdated);
    })
    promise.catch(function (err) {
        console.log(err);
    })
}

//Lưu Thông Tin
getSelect('#btnLuuThongTin').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = getSelect('#maNhanVien').value;
    nv.tenNhanVien = getSelect('#tenNhanVien').value;
    var mangChucVu = getSelect('#chucVu').options;
    var viTriChucVu = getSelect('#chucVu').selectedIndex;
    nv.chucVu = mangChucVu[viTriChucVu].innerHTML;
    nv.heSoChucVu = getSelect('#chucVu').value;
    nv.luongCoBan = getSelect('#luongCoBan').value;
    nv.soGioLamTrongThang = getSelect('#gioLamTrongThang').value;
    var promise = svService.capNhatThongTinNhanVien(nv);
    promise.then(function (result) {
        console.log(result.data);
        loadDuLieuNhanVien(result.data);
    })
    promise.catch(function (err) {
        console.log(err);
    })
}
getSelect('#btnLuuThongTin').disabled = true;
loadDuLieuNhanVien();