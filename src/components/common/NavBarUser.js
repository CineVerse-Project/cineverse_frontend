import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import useAuth from "../../auth/useAuth";

function NavBarUser() {
  const {auth} = useAuth();
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  // const username = localStorage.getItem('username') ? localStorage.getItem('username') : null;
  // const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
  // const roles = localStorage.getItem('roles') ? localStorage.getItem('roles') : null;
  const usernameAuth = auth?.username ? auth?.username : null;
  const roles = auth?.roles ? auth?.roles : null;
  const tokens = auth?.token ? auth?.token : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (usernameAuth) {
      setUser(usernameAuth);
    } else {
      setUser(null);
    }
    if (tokens) {
      setToken(tokens)
    } else {
      setToken(null);
    }
    if (roles) {
      setRole(roles);
    } else {
      setRole(null);
    }
  }, [usernameAuth,roles,tokens])
  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("roles");
    window.location.reload();
    navigate("/");
  }
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

          {user ? <img className="profile-picture" src="../pages/user/style/img/18.jpg" alt="" /> : ''}
          <div className="profile-text-container">
           <div className="dropdown">
            {!user ? <span className="profile-text dropbtn">Tài khoản</span> : <Link to={`/user/${user}`}className="profile-text">{user}</Link>}  
              <i className="fas fa-caret-down dropbtn" />
              <div className="dropdown-content">
                {
                  !user ? <ul>

                    <li>
                      <Link to="/sign-in">Đăng nhập</Link>
                    </li>
                    <li>
                      <Link to="/sign-up">Đăng ký</Link>
                    </li>
                    <li>
                      <Link to="/forgot-password">Quên mật khẩu?</Link>
                    </li>
                  </ul> :

                    <ul>
                      <li>
                        <Link to={`/user/${user}`}>Thông tin</Link>
                      </li>
                      <li>
                        <Link to={`/user/change-password/${user}`}>Đổi mật khẩu</Link>
                      </li>
                      <li>
                        <Link to="" onClick={handleSignOut}>Đăng xuất</Link>
                      </li>
                    </ul>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBarUser;
