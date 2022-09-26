function DSVN() {
  this.arr = [];

  this.findindexNV = function (tk) {
    var index = -1;
    this.arr.forEach(function (sv, i) {
      if (sv.taiKhoan === tk) {
        index = i;
      }
    });
    return index;
  };

  this.delNV = function (tk) {
    var index = this.findindexNV(tk);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.chinhSuaNV = function (tk) {
    var index = this.findindexNV(tk);
    if (index !== -1) {
      return this.arr[index];
    }

    return null;
  };

  this.findNV = function (keyword) {
    var arrFind = [];
    //bo tieng viet co dau
    function removeAccents(str) {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    }
    this.arr.forEach(function (nv) {
      var loaiNV = removeAccents(nv.loaiNV.toLowerCase());
      var search = removeAccents(keyword.toLowerCase());
      if (loaiNV.indexOf(search) !== -1) {
        arrFind.push(nv);
      }
    });

    return arrFind;
  };

  this.updateNV = function (nv) {
    //tim vi tri nv
    var index = this.findindexNV(nv.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };

  this.addNV = function (nv) {
    var check = this.arr.find(function (obj) {
      return obj.taiKhoan === nv.taiKhoan;
    });
    if (check == undefined) {
      this.arr.push(nv);
    } else {
      domID("tbTKNV").style.display = "block";
      domID("tbTKNV").innerHTML = "Tài khoản đã tồn tại";
    }
  };
}
