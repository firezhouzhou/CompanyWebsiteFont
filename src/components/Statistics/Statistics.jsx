import React, { useState, useEffect, useRef } from 'react';
import './Statistics.css';

const defaultStats = [
  { id: 1, label: '成立年份', value: 2005, suffix: '年', prefix: '' },
  { id: 2, label: '服务客户', value: 10000, suffix: '+', prefix: '' },
  { id: 3, label: '全球员工', value: 50000, suffix: '+', prefix: '' },
  { id: 4, label: '业务覆盖国家', value: 50, suffix: '+', prefix: '' },
];

const Statistics = ({ stats = defaultStats }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounters(stats.map((stat) => Math.floor(stat.value * eased)));

      if (currentStep >= steps) {
        setCounters(stats.map((stat) => stat.value));
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, stats]);

  const formatNumber = (num) => {
    return num.toLocaleString('zh-CN');
  };

  return (
    <div className="statistics" ref={sectionRef}>
      <div className="statistics__grid container">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`statistics__item ${isVisible ? 'statistics__item--visible' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="statistics__number">
              {stat.prefix}
              <span className="statistics__value">{formatNumber(counters[index])}</span>
              <span className="statistics__suffix">{stat.suffix}</span>
            </div>
            <div className="statistics__label">{stat.label}</div>
            <div className="statistics__divider"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
