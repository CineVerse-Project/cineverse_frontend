import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "bootstrap";


function NavBarUser() {
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const username = localStorage.getItem('username') ? localStorage.getItem('username') : null;
  const accessToken = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
  const roles = localStorage.getItem('roles') ? localStorage.getItem('roles') : null;
  const navigate = useNavigate();
  useEffect(() => {
    if (username) {
      setUser(username);
    } else {
      setUser(null);
    }
    if (accessToken) {
      setToken(accessToken)
    } else {
      setToken(null);
    }
    if (roles) {
      setRole(roles);
    } else {
      setRole(null);
    }
  }, [user, token, role, username, accessToken, roles])
  console.log(roles);
  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("roles");
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
            {/* <li className="menu-list-item">
              {
                !user ? 
                 <Link to="sign-in" style={{color: 'white'}}>Đăng nhập</Link>
                 :<div><Link to={`user/${user}`}>Xin chào, {user}!</Link> <button onClick={handleSignOut}>Đăng xuất</button></div>
              }
                
              </li> */}

          </ul>
        </div>

        <div className="profile-container">

          <img className="profile-picture" src="../pages/user/style/img/18.jpg" alt="" />
          <div className="profile-text-container">
            {!user ? <span className="profile-text">Tài khoản</span> : <Link to={`/user/${user}`}className="profile-text">{user}</Link>}  
            <div className="dropdown">
              <i className="fas fa-caret-down dropbtn" />
              <div class="dropdown-content">
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
                        <Link to={`/user/${username}`}>Thông tin</Link>
                      </li>
                      <li>
                        <Link to={`/user/change-password/${username}`}>Đổi mật khẩu</Link>
                      </li>
                      <li>
                        <Link to="" onClick={handleSignOut}>Đăng xuất</Link>
                      </li>
                    </ul>
                }
              </div>
            </div>
          </div>
          <div className="toggle" >
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
