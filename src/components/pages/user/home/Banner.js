import React from "react";

function Banner() {
  return (
    <>
      <div className="featured-content-banner">
        <span>Ra mắt</span>
        <h1>Hiệp sĩ rồng</h1>
        <p className="featured-desc">
          Một bộ phim phiêu lưu đầy kì thú của Jack chiến binh kị sĩ rồng cuối
          cùng của nhân loại. Trong bộ phim này nhân vật Jack do Tony Smitd thủ
          vai sẽ đưa chúng ta trở về vùng đất hứa để tiêu diệt hang ổ của kè thù
          và bảo vệ được quê hương.
        </p>
        <button className="featured-button">Xem ngay</button>
      </div>
      <video
        id="comp-jd8sqvtk_video"
        className="K8MSra video-banner"
        role="presentation"
        crossOrigin="anonymous"
        playsInline
        preload="auto"
        muted
        loop
        tabIndex={-1}
        autoPlay
        src="https://video.wixstatic.com/video/f2ac30_0a607a47865e44b9bddd4ce458330749/1080p/mp4/file.mp4"
      ></video>
    </>
  );
}

export default Banner;
