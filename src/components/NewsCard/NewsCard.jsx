import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import './NewsCard.css';

const NewsCard = ({
  title = '新闻标题',
  summary = '新闻摘要内容...',
  date = '2024-01-01',
  category = '公司新闻',
  image = null,
  link = '#',
  gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}) => {
  return (
    <article className="news-card">
      <div className="news-card__image" style={{ background: image || gradient }}>
        <span className="news-card__category">{category}</span>
      </div>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span className="news-card__date">
            <FiCalendar className="news-card__date-icon" />
            {date}
          </span>
        </div>
        <h3 className="news-card__title">
          <Link to={link} className="news-card__title-link">
            {title}
          </Link>
        </h3>
        <p className="news-card__summary">{summary}</p>
        <Link to={link} className="news-card__read-more" aria-label={`阅读更多：${title}`}>
          阅读更多 <FiArrowRight className="news-card__arrow" />
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
