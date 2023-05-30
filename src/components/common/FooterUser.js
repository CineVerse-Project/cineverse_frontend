import React from "react";
import { Link } from "react-router-dom";

function FooterUser() {

  const handleClick = () => {
    window.scrollTo(0, 0); // Di chuyển trang web đến đầu trang
  };

  return (
    <>
      <div className="container" style={{paddingLeft:'40px'}}>
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4">
              <div className="single-cta box-tt">
                <i className="fas fa-map-marker-alt" />
                <div className="cta-text">
                  <h4>Địa chỉ</h4>
                  <span>FPT Complex, Đà Nẵng</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4">
              <div className="single-cta box-tt">
                <i className="fas fa-phone" />
                <div className="cta-text">
                  <h4>Liên hệ</h4>
                  <span>84+ 091 987 9374</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4">
              <div className="single-cta box-tt">
                <i className="far fa-envelope-open" />
                <div className="cta-text">
                  <h4>Email</h4>
                  <span>CineVerse@fpt.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="logo-container">
                <Link to="/" onClick={handleClick} >
                  <h1 className="logo">CineVerse</h1>
                </Link>
                </div>
                <div className="footer-text-cineverse">
                  <p>
                    Hiện nay, CineVerse Cinema đang ngày càng phát triển hơn nữa
                    với bộ phim bom tấn của thế giới và Việt Nam.
                  </p>
                </div>
                <div className="footer-social-icon">
                  <a href="#">
                    <i className="fab fa-facebook-f facebook-bg" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter twitter-bg" />
                  </a>
                  <a href="#">
                    <i className="fab fa-google-plus-g google-bg" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Dịch vụ khách hàng</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Về chúng tôi</a>
                  </li>
                  <li>
                    <a href="#">Góp ý</a>
                  </li>
                  <li>
                    <a href="#">Quy chế</a>
                  </li>
                  <li>
                    <a href="#">Sale &amp; service</a>
                  </li>
                  <li>
                    <a href="#">Lợi ích</a>
                  </li>
                  <li>
                    <a href="#">Rạp &amp; giá vé</a>
                  </li>
                  <li>
                    <a href="#">Thỏa thuận</a>
                  </li>
                  <li>
                    <a href="#">Tuyển dụng</a>
                  </li>
                  <li>
                    <a href="#">Bảo mật</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Đăng kí</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                    Đừng bỏ lỡ đăng ký nguồn phim đa dạng của chúng tôi, vui
                    lòng điền vào mẫu dưới đây.
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <i className="fab fa-telegram-plane" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-lg-left">
              <div className="copyright-text">
                <p>
                  CINEMER © Rạp chiếu phim{" "}
                  <a href="https://codepen.io/anupkumar92/">CineVerse</a>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-center">
              <div className="footer-menu">
                <ul>
                  <li>
                  <Link to="/" onClick={handleClick} >
                    <a href="#">Trang chủ</a>
                  </Link>
                  </li>
                  <li>
                    <a href="#">Phim</a>
                  </li>
                  <li>
                    <a href="#">Rạp</a>
                  </li>
                  <li>
                    <a href="#">Thông tin</a>
                  </li>
                  <li>
                    <a href="#">Bảo mật</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}

export default FooterUser;
