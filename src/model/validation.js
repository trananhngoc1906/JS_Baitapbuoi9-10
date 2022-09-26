function Validation() {
  this.checkEmpty = function (value, divError, mess) {
    if (value.trim() === "") {
      //show thong bao loi
      domID(divError).innerHTML = mess;
      domID(divError).style.display = "block";
      return false;
    }
    domID(divError).innerHTML = "";
    domID(divError).style.display = "none";
    return true;
  };

  this.checkChucVu = function (idSelect, divError, mess) {
    if (domID(idSelect).selectedIndex !== 0) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkLength = function (value, divError, mess, min, max) {
    if (min <= value.length && value.length <= max) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkChuoiKyTu = function (value, divError, mess) {
    //a-z
    var letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkNumber = function (value, divError, mess) {
    var number = /^[0-9]+$/;
    if (value.match(number)) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkEmail = function (value, divError, mess) {
    var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(email)) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkPass = function (value, divError, mess) {
    var password =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (value.match(password)) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkMinMax = function (value, divError, mess, min, max) {
    if (min <= value && value <= max) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };

  this.checkDay = function (value, divError, mess) {
    var checkDay =
      /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (value.match(checkDay)) {
      domID(divError).innerHTML = "";
      domID(divError).style.display = "none";
      return true;
    }
    domID(divError).innerHTML = mess;
    domID(divError).style.display = "block";
    return false;
  };
}
