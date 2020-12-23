var getSection = function (id) {
    return document.querySelector(id);
}
var createEle = function (tag) {
    return document.createElement(tag);
}
var validation = new Validation();
var mangNhanVien = [];
getSection('#btnXacNhan').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = getSection('#maNhanVien').value;
    nv.tenNhanVien = getSection('#tenNhanVien').value;
    nv.heSoChucVu = getSection('#chucVu').value;

    nv.luongCoBan = getSection('#luongCoBan').value;
    nv.gioLamTrongThang = getSection('#gioLamTrongThang').value;

    var mangChucVu = getSection('#chucVu').options;
    var viTriChucVu = getSection('#chucVu').selectedIndex;
    nv.chucVu = mangChucVu[viTriChucVu].innerHTML;
    // console.log(nv);

    //Kiểm tra hợp lệ
    //Kiểm tra rỗng
    var valid = true;
    valid &= validation.kiemTraRong(nv.maNhanVien, 'Mã Nhân Viên', '#kiemTraRong-maNhanVien') & validation.kiemTraRong(nv.tenNhanVien, 'Tên Nhân Viên', '#kiemTraRong-tenNhanVien') & validation.kiemTraRong(nv.luongCoBan, 'Lương cơ bản', '#kiemTraRong-luongCoBan') & validation.kiemTraRong(nv.gioLamTrongThang, 'Giờ làm trong tháng', '#kiemTraRong-gioLamTrongThang');

    //Kiểm tra định dạng
    valid &= validation.kiemTraDoDai(nv.maNhanVien, 'Mã nhân viên', '#kiemTraDoDai-maNhanVien', 4, 6);

    valid &= validation.kiemTraTatCaLaKyTu(nv.tenNhanVien, 'Tên nhân viên', '#kiemTraDinhDang-tenNhanVien');
    valid &= validation.kiemTraTatCaLaSo(nv.luongCoBan, 'Lương cơ bản', '#kiemTraDinhDang-luongCoBan');
    valid &= validation.kiemTraGiaTri(nv.luongCoBan, 'Lương căn bản', '#kiemTraGiaTri-luongCoBan', 1000000, 20000000);
    valid &= validation.kiemTraTatCaLaSo(nv.gioLamTrongThang, 'Giờ làm trong tháng', '#kiemTraDinhDang-gioLamTrongThang');
    valid &= validation.kiemTraGiaTri(nv.gioLamTrongThang, 'Giờ làm trong tháng', '#kiemTraGiaTri-gioLamTrongThang', 50, 150);

    if (!valid) {
        return;
        
    }
    mangNhanVien.push(nv);
    renderTableNhanVien(mangNhanVien);
    luuDataTrenLocalStorage();
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
        nv.tongLuong = arrayNhanVien[index].tenNhanVien;
        nv.tenNhanVien = arrayNhanVien[index].tenNhanVien;
        nv.gioLamTrongThang = arrayNhanVien[index].gioLamTrongThang;
        nv.heSoChucVu = arrayNhanVien[index].heSoChucVu;

        noiDungTable += `
            <tr>    
                <td>${nv.maNhanVien}</td>
                <td>${nv.tenNhanVien}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.luongCoBan}</td>
                <td>${nv.tinhTongLuong()}</td>
                <td>${nv.gioLamTrongThang}</td>
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
    getSection('#addBody').innerHTML = noiDungTable;
}
//ONLICK LƯU THÔNG TIN
getSection('#btnLuuThongTin').onclick = function () {
    getSection('#btnXacNhan').disabled = false;
    getSection('#maNhanVien').disabled = true;
    getSection('#btnLuuThongTin').disabled = true;
    var nv = new NhanVien();
    nv.maNhanVien = getSection('#maNhanVien').value;
    nv.tenNhanVien = getSection('#tenNhanVien').value;
    nv.luongCoBan = getSection('#luongCoBan').value;
    nv.gioLamTrongThang = getSection('#gioLamTrongThang').value;
    var mangChucVu = getSection('#chucVu').options;
    var viTriChucVu = getSection('#chucVu').selectedIndex;
    nv.chucVu = mangChucVu[viTriChucVu].innerHTML;
    nv.heSoChucVu = mangChucVu[viTriChucVu].value;
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nvUpdate = mangNhanVien[index];
        if (nvUpdate.maNhanVien === nv.maNhanVien) {
            nvUpdate.tenNhanVien = nv.tenNhanVien;
            nvUpdate.chucVu = nv.chucVu;
            nvUpdate.luongCoBan = nv.luongCoBan;
            nvUpdate.gioLamTrongThang = nv.gioLamTrongThang;
            nvUpdate.heSoChucVu = nv.heSoChucVu;
            luuDataTrenLocalStorage();
            renderTableNhanVien(mangNhanVien);
        }
    }
}
// CHỨC NĂNG XOÁ
var xoaNhanVien = function (maNV) {
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        var nv = mangNhanVien[index];
        if (nv.maNhanVien === maNV) {
            mangNhanVien.splice(index, 1);
        }
    }
    luuDataTrenLocalStorage();
    renderTableNhanVien(mangNhanVien);
}

//CHỨC NĂNG CHỈNH SỬA
var chinhSuaThongTin = function (maNV) {
    getSection('#btnXacNhan').disabled = true;
    getSection('#maNhanVien').disabled = true;
    getSection('#btnLuuThongTin').disabled = false;

    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];
        if (nv.maNhanVien === maNV) {
            getSection('#maNhanVien').value = nv.maNhanVien;
            getSection('#tenNhanVien').value = nv.tenNhanVien;
            getSection('#chucVu').value = nv.heSoChucVu;
            getSection('#luongCoBan').value = nv.luongCoBan;
            getSection('#gioLamTrongThang').value = nv.gioLamTrongThang;
        }
    }
}
var luuDataTrenLocalStorage = function () {
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}
var layDataTrenLocalStorage = function () {
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        mangNhanVien = JSON.parse(sMangNhanVien);
        renderTableNhanVien(mangNhanVien);
    }
}
layDataTrenLocalStorage();