function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = 0;
  this.loaiNV = "";

  this.tinhLuong = function () {
    switch (this.chucVu) {
      case 1:
        {
          this.tongLuong = this.luongCB * 3;
          this.chucVu = "Giám đốc";
        }
        break;
      case 2:
        {
          this.tongLuong = this.luongCB * 2;
          this.chucVu = "Trưởng phòng";
        }
        break;
      case 3:
        {
          this.tongLuong = this.luongCB;
          this.chucVu = "Nhân viên";
        }
        break;
    }
  };

  this.loaiNV = function () {
    if (this.gioLam <= 0) {
      this.loaiNV = "Nhân viên tệ";
    } else if (0 < this.gioLam && this.gioLam < 160) {
      this.loaiNV = "Nhân viên trung bình";
    } else if (160 <= this.gioLam && this.gioLam < 176) {
      this.loaiNV = "Nhân viên khá";
    } else if (176 <= this.gioLam && this.gioLam < 192) {
      this.loaiNV = "Nhân viên giỏi";
    } else {
      this.loaiNV = "Nhân viên xuất sắc";
    }
  };
}
