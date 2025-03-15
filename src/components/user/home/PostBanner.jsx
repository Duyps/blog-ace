import React, { useState } from 'react'
import './postbanner.css'
function PostBanner({post}) {
    const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const [showArrow, setShowArrow] = useState(false);

  const handleMouseMove = (e) => {
    const banner = e.currentTarget.getBoundingClientRect();
    const centerX = banner.width / 2;
    const centerY = banner.height / 2;

    // Lấy vị trí chuột so với trung tâm ảnh
    const dx = e.clientX - banner.left - centerX;
    const dy = e.clientY - banner.top - centerY;

    // Giới hạn phạm vi di chuyển trong vòng tròn bán kính 30px
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 30;

    let limitedX = dx;
    let limitedY = dy;

    if (distance > maxRadius) {
      const scale = maxRadius / distance;
      limitedX = dx * scale;
      limitedY = dy * scale;
    }

    setArrowPosition({ x: centerX + limitedX, y: centerY + limitedY });
  };
  return (
    <div className='post-banner' onMouseEnter={() => setShowArrow(true)} onMouseLeave={() => setShowArrow(false)} onMouseMove={handleMouseMove}>
        <img src={post.bannerImage} alt={post.title} className='banner-image' />
        {showArrow && (
            <div className="arrow" style={{ left: `${arrowPosition.x}px`, top: `${arrowPosition.y}px` }}>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
        )}
    </div>
  )
}

export default PostBanner