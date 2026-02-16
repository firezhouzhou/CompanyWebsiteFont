import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Carousel.css';

const Carousel = ({ slides = [], autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const defaultSlides = [
    {
      id: 1,
      title: '引领数字化转型',
      subtitle: '以技术创新驱动企业发展，构建智能化未来',
      gradient: 'linear-gradient(135deg, #FF6A00 0%, #ee0979 100%)',
      btnText: '了解更多',
      btnLink: '/about',
    },
    {
      id: 2,
      title: '全球化解决方案',
      subtitle: '覆盖全球50+国家和地区，服务超过10000家企业客户',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
      btnText: '查看方案',
      btnLink: '/solutions',
    },
    {
      id: 3,
      title: '产品与服务',
      subtitle: '提供云计算、大数据、人工智能等全方位数字化产品',
      gradient: 'linear-gradient(135deg, #0f3460 0%, #16498a 50%, #FF6A00 100%)',
      btnText: '浏览产品',
      btnLink: '/products',
    },
  ];

  const displaySlides = slides.length > 0 ? slides : defaultSlides;

  const goToSlide = useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % displaySlides.length;
    goToSlide(nextIndex);
  }, [currentIndex, displaySlides.length, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + displaySlides.length) % displaySlides.length;
    goToSlide(prevIndex);
  }, [currentIndex, displaySlides.length, goToSlide]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, goNext]);

  return (
    <div className="carousel" role="region" aria-label="轮播图" aria-roledescription="carousel">
      <div className="carousel__track">
        {displaySlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel__slide ${index === currentIndex ? 'carousel__slide--active' : ''}`}
            style={{ background: slide.gradient }}
            role="group"
            aria-roledescription="slide"
            aria-label={`第 ${index + 1} 张，共 ${displaySlides.length} 张`}
          >
            <div className="carousel__content container">
              <div className="carousel__text">
                <h1 className="carousel__title">{slide.title}</h1>
                <p className="carousel__subtitle">{slide.subtitle}</p>
                {slide.btnText && (
                  <a href={slide.btnLink} className="btn btn--white carousel__btn">
                    {slide.btnText}
                  </a>
                )}
              </div>
              <div className="carousel__visual">
                <div className="carousel__shape carousel__shape--1"></div>
                <div className="carousel__shape carousel__shape--2"></div>
                <div className="carousel__shape carousel__shape--3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="carousel__arrow carousel__arrow--prev"
        onClick={goPrev}
        aria-label="上一张"
      >
        <FiChevronLeft />
      </button>
      <button
        className="carousel__arrow carousel__arrow--next"
        onClick={goNext}
        aria-label="下一张"
      >
        <FiChevronRight />
      </button>

      {/* Dots */}
      <div className="carousel__dots" role="tablist" aria-label="轮播导航">
        {displaySlides.map((_, index) => (
          <button
            key={index}
            className={`carousel__dot ${index === currentIndex ? 'carousel__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`跳转到第 ${index + 1} 张`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
