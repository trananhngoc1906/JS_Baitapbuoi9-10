var dsnv = new DSVN();
var validation = new Validation();

getLocalStorage();

function domID(id) {
  return document.getElementById(id);
}

function layThongTinNV() {
  var taiKhoan = domID("tknv").value;
  var hoTen = domID("name").value;
  var email = domID("email").value;
  var matKhau = domID("password").value;
  var ngayLam = domID("datepicker").value;
  var luongCB = domID("luongCB").value;
  var chucVu = domID("chucvu").selectedIndex;
  var gioLam = domID("gioLam").value;

  //flag
  var isValid = true;

  //check validation
  //taikhoan
  isValid &=
    validation.checkEmpty(taiKhoan, "tbTKNV", "(*) Vui lòng không để trống.") &&
    validation.checkLength(
      taiKhoan,
      "tbTKNV",
      "(*) Vui lòng nhập từ 4 đến 6 số.",
      4,
      6
    ) &&
    validation.checkNumber(taiKhoan, "tbTKNV", "(*) Chỉ được nhập số.");

  //hoten
  isValid &=
    validation.checkEmpty(hoTen, "tbTen", "(*) Vui lòng không để trống.") &&
    validation.checkChuoiKyTu(
      hoTen,
      "tbTen",
      "(*) Vui lòng không nhập số vào tên."
    );

  //email
  isValid &=
    validation.checkEmpty(email, "tbEmail", "(*) Vui lòng không để trống.") &&
    validation.checkEmail(email, "tbEmail", "(*) Định dạng email chưa đúng.");

  //password
  isValid &=
    validation.checkEmpty(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng không để trống."
    ) &&
    validation.checkLength(
      matKhau,
      "tbMatKhau",
      "(*) Vui lòng nhập từ 6 đến 10 ký tự.",
      6,
      10
    ) &&
    validation.checkPass(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự thường, 1 ký tự đặc biệt."
    );

  //day
  isValid &= validation.checkEmpty(
    ngayLam,
    "tbNgay",
    "(*) Vui lòng không để trống."
  );

  //basepay
  isValid &=
    validation.checkEmpty(
      luongCB,
      "tbLuongCB",
      "(*) Vui lòng Vui lòng không để trống."
    ) &&
    validation.checkNumber(luongCB, "tbLuongCB", "(*) Chỉ được nhập số.") &&
    validation.checkMinMax(
      luongCB,
      "tbLuongCB",
      "(*) Lương cơ bản phải từ 1,000,000 đến 20,000,000.",
      1000000,
      20000000
    );

  //chucvu
  isValid &= validation.checkChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ."
  );

  //giolam
  isValid &=
    validation.checkEmpty(
      gioLam,
      "tbGiolam",
      "(*) Vui lòng Vui lòng không để trống."
    ) &&
    validation.checkNumber(gioLam, "tbGiolam", "(*) Chỉ được nhập số.") &&
    validation.checkMinMax(
      gioLam,
      "tbGiolam",
      "(*) Giờ làm phải từ 80 đến 200.",
      80,
      200
    );

  if (isValid) {
    //tao nhan vien moi
    var nv = new NhanVien(
      taiKhoan,
      hoTen,
      email,
      matKhau,
      ngayLam,
      luongCB,
      chucVu,
      gioLam
    );
    nv.tinhLuong();
    nv.loaiNV();
  }
  return nv;
}

//hien thong tin nv ra bang
function renderTable(data) {
  var content = "";

  data.forEach(function (nv) {
    content += `

    <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong}</td>
        <td>${nv.loaiNV}</td>
        <td>
        <button onclick="delNV('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
        <button onclick="editNV('${nv.taiKhoan}')" id="editNV" data-toggle="modal" data-target="#myModal" class="btn btn-success">Sửa</button>
        </td>
    </tr>
`;
  });

  domID("tableDanhSach").innerHTML = content;
}

//them nhan vien
domID("btnThemNV").addEventListener("click", function () {
  var nv = layThongTinNV();

  //them nv
  dsnv.addNV(nv);

  //hien thong tin nv
  renderTable(dsnv.arr);

  //luu thong tin xuong localStorage
  setLocalStorage(dsnv.arr);
});

//cap nhat nhan vien
domID("searchName").addEventListener("keyup", function () {
  var keyword = domID("searchName").value;

  var arrFind = dsnv.findNV(keyword);
  renderTable(arrFind);
});

domID("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTinNV();

  dsnv.updateNV(nv);

  renderTable(dsnv.arr);

  setLocalStorage(dsnv.arr);
});

//xoa nhan vien
function delNV(tk) {
  dsnv.delNV(tk);

  renderTable(dsnv.arr);

  setLocalStorage(dsnv.arr);
}

//edit nhan vien
function editNV(tk) {
  var nv = dsnv.chinhSuaNV(tk);

  domID("tknv").value = nv.taiKhoan;
  domID("tknv").disabled = true;
  domID("name").value = nv.hoTen;
  domID("email").value = nv.email;
  domID("password").value = nv.matKhau;
  domID("datepicker").value = nv.ngayLam;
  domID("luongCB").value = nv.luongCB;

  if (nv.chucVu === "Giám đốc") {
    domID("chucvu").selectedIndex = 1;
  } else if (nv.chucVu === "Trưởng phòng") {
    domID("chucvu").selectedIndex = 2;
  } else if (nv.chucVu === "Nhân viên") {
    domID("chucvu").selectedIndex = 3;
  }

  domID("gioLam").value = nv.gioLam;
  domID("btnThemNV").style.display = "none";
}

//truyen thong tin xuong storage
function setLocalStorage() {
  //chuyển arr từ JSON => String
  var data = JSON.stringify(dsnv.arr);
  //lưu data xuống LocalStorage của trình duyệt
  localStorage.setItem("DSNV", data);
}

//lay thong tin tu storage len
function getLocalStorage() {
  if (localStorage.getItem("DSNV")) {
    var data = localStorage.getItem("DSNV");
    //convert String => JSON
    dsnv.arr = JSON.parse(data);
    renderTable(dsnv.arr);
  }
}
