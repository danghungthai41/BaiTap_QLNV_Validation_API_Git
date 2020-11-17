var Validation = function () {
    this.kiemTraRong = function (value, name, selectorError) {
        //value: giá trị người dùng nhập từ input
        //name: Tên thuộc tính kiểm tra
        //selectorError: thẻ mà mình sẽ hiển thị lỗi
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML =  '*' + name + ' không được để trống' + '*';
            document.querySelector(selectorError).className = 'text-danger';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        return true;
    }

    this.kiemTraTatCaLaKyTu = function(value, name, selectorError){
        var regexWord = /^[A-Z a-z]+$/;
        if(!regexWord.test(value.trim())){
            document.querySelector(selectorError).innerHTML = '*' + name + ' phải là ký tự !' + '*';
            document.querySelector(selectorError).className = 'text-danger';
            return false;
        } 
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraTatCaLaSo = function(value, name, selectorError){
        var regexNumber = /^[0-9.]+$/;
        if(!regexNumber.test(value)){
            document.querySelector(selectorError).innerHTML = '*' + name + ' phải là số' + '*';
            document.querySelector(selectorError).className = 'text-danger';

            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraGiaTri = function(value, name, selectorError, minValue, maxValue){
        if(Number(value) < minValue || Number(value) > maxValue){
            document.querySelector(selectorError).innerHTML = '*' + name + ' phải từ ' + minValue + ' đến ' + maxValue + '*';
            document.querySelector(selectorError).className = 'text-danger';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraDoDai = function(value, name, selectorError, minLength, maxLength){
        if(value.trim().length < minLength || value.trim().length > maxLength){
            document.querySelector(selectorError).innerHTML = '*' + name + ' phải từ ' + minLength + ' đến ' + maxLength + '*';
            document.querySelector(selectorError).className = 'text-danger';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}