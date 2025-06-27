import React from 'react';
import laptopImg from './assets/GL2.jpg';
import phoneImg from './assets/phone.jpg';
import macbookImg from './assets/macbook.jpg';
import accessoriesImg from './assets/accessories.jpg';
import evoImg from './assets/evo.jpg';
import ultrabookImg from './assets/ultrabook.jpg';

const News = () => {
  const newsItems = [
    {
      title: "Gaming Beast",
      text: "New Gaming Laptop Released with RTX 5090!",
      image: laptopImg,
    },
    {
      title: "UltraBook Sale",
      text: "Huge Discounts on UltraBooks this Summer!",
      image: ultrabookImg,
    },
    {
      title: "Latest Smartphones",
      text: "Latest phones now in stock!",
      image: phoneImg,
    },
    {
      title: "MacBook Pro M4",
      text: "Apple launches M4 chip with blazing speed!",
      image: macbookImg,
    },
    {
      title: "Accessories Bonanza",
      text: "Get up to 50% off on top accessories!",
      image: accessoriesImg,
    },
    {
      title: "Intel Evo Series",
      text: "New Intel Evo Certified Models Now Available!",
      image: evoImg,
    },
  ];
  const infiniteItems = [...newsItems, ...newsItems];

  const containerStyle = {
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f5f2fa',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
  };

  const marqueeWrapperStyle = {
    width: '100%',
    maxWidth: '950px',
    overflow: 'hidden',
    borderRadius: '16px',
    backgroundColor: '#fff',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  };

  const marqueeInnerStyle = {
    display: 'flex',
    flexDirection: 'column',
    animation: 'scrollUp 30s linear infinite',
  };

  const newsItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '20px 30px',
    borderBottom: '1px solid #eee',
  };

  const imageStyle = {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '16px',
    border: '1px solid #ccc',
    flexShrink: 0,
  };

  const textContainer = {
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#2d2d2d',
    marginBottom: '6px',
  };

  const descStyle = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  };

  const keyframes = `
    @keyframes scrollUp {
      0% { transform: translateY(0%); }
      100% { transform: translateY(-50%); }
    }

    @media (max-width: 768px) {
      .news-item {
        flex-direction: column;
        text-align: center;
        padding: 20px;
      }

      .news-img {
        width: 90px !important;
        height: 90px !important;
      }

      .news-title {
        font-size: 18px !important;
      }

      .news-desc {
        font-size: 14px !important;
      }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframes}</style>
      <h1 style={{ marginBottom: '25px', color: '#3e3e3e', fontSize: '28px' }}>
         Product Highlights
      </h1>
      <div style={marqueeWrapperStyle}>
        <div style={marqueeInnerStyle}>
          {infiniteItems.map((item, index) => (
            <div key={index} style={newsItemStyle} className="news-item">
              <img src={item.image} alt={item.title} style={imageStyle} className="news-img" />
              <div style={textContainer}>
                <div style={titleStyle} className="news-title">{item.title}</div>
                <div style={descStyle} className="news-desc">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
