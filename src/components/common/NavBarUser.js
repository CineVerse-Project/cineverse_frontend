import { Button } from "bootstrap";
import React from "react";
import { Link } from "react-router-dom";

function NavBarUser() {
  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <h1 className="logo">CineVerse</h1>
        </div>
        <div className="menu-container">
          <ul className="menu-list">
            <li className="menu-list-item">
              <Link to="/">
                <a>Trang chủ</a>
              </Link>
            </li>
            <li className="menu-list-item">
              <Link to="/">
                <a>Phim</a>
              </Link>
            </li>
            <li className="menu-list-item">
              <a href="#">Rạp</a>
            </li>
            <li className="menu-list-item">
              <a href="#">Thông tin</a>
            </li>
          </ul>
        </div>
        <div className="profile-container">
          <img className="profile-picture" src="../pages/user/style/img/18.jpg" alt="" />
          <div className="profile-text-container">
            <span className="profile-text">Tài khoản</span>
              <div className="dropdown">
                <i className="fas fa-caret-down dropbtn"/>
                <div class="dropdown-content">
                  <ul>
                    <li>
                      <a href="#">Đăng nhập</a>
                    </li>
                    <li>
                      <a href="#">Đăng kí</a>
                    </li>
                    <li>
                      <a href="#">Quên mật khẩu</a>
                    </li>
                  </ul>

                  <ul style={{display:'none'}}>
                    <li>
                      <a href="#">Thông tin</a>
                    </li>
                    <li>
                      <a href="#">Đổi mật khẩu</a>
                    </li>
                    <li>
                      <a href="#">Đăng xuất</a>
                    </li>
                  </ul>
                </div>
              </div>           
          </div>
          <div className="toggle">
            <i className="fas fa-moon toggle-icon" />
            <i className="fas fa-sun toggle-icon" />
            <div className="toggle-ball" />
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarUser;
