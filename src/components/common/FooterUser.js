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
                  <Link to="#">
                    <i className="fab fa-facebook-f facebook-bg" />
                  </Link>
                  <Link to="#">
                    <i className="fab fa-twitter twitter-bg" />
                  </Link>
                  <Link to="#">
                    <i className="fab fa-google-plus-g google-bg" />
                  </Link>
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
                    <Link to="#">Về chúng tôi</Link>
                  </li>
                  <li>
                    <Link to="#">Góp ý</Link>
                  </li>
                  <li>
                    <Link to="#">Quy chế</Link>
                  </li>
                  <li>
                    <Link to="#">Sale &amp; service</Link>
                  </li>
                  <li>
                    <Link to="#">Lợi ích</Link>
                  </li>
                  <li>
                    <Link to="#">Rạp &amp; giá vé</Link>
                  </li>
                  <li>
                    <Link to="#">Thỏa thuận</Link>
                  </li>
                  <li>
                    <Link to="#">Tuyển dụng</Link>
                  </li>
                  <li>
                    <Link to="#">Bảo mật</Link>
                  </li>
                  <li>
                    <Link to="#">Blog</Link>
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
                  <Link to="https://codepen.io/anupkumar92/">CineVerse</Link>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-center">
              <div className="footer-menu">
                <ul>
                  <li>
                  <Link to="/" onClick={handleClick} >
                    Trang chủ
                  </Link>
                  </li>
                  <li>
                    <Link to="#">Phim</Link>
                  </li>
                  <li>
                    <Link to="#">Rạp</Link>
                  </li>
                  <li>
                    <Link to="#">Thông tin</Link>
                  </li>
                  <li>
                    <Link to="#">Bảo mật</Link>
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
