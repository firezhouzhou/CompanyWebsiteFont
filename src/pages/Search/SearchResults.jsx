import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  FiSearch,
  FiArrowRight,
  FiFileText,
  FiPackage,
  FiGrid,
  FiClock,
} from 'react-icons/fi';
import { search as searchApi } from '../../api/api';
import './SearchResults.css';

/* Icons for different result types */
const typeIcons = {
  product: <FiPackage />,
  solution: <FiGrid />,
  news: <FiFileText />,
  default: <FiFileText />,
};

const typeLabels = {
  product: '产品',
  solution: '解决方案',
  news: '新闻动态',
};

const typeColors = {
  product: '#667eea',
  solution: '#f5576c',
  news: '#4facfe',
};

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const [inputValue, setInputValue] = useState(keyword);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const performSearch = useCallback(
    async (query) => {
      if (!query.trim()) return;
      setIsLoading(true);
      setHasSearched(true);

      try {
        const response = await searchApi(query);
        setResults(response.data || response || []);
      } catch (err) {
        console.error('Search failed:', err);
        /* Fallback: use mock data for demo purposes */
        setResults(getMockResults(query));
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (keyword) {
      setInputValue(keyword);
      performSearch(keyword);
    }
  }, [keyword, performSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ keyword: inputValue.trim() });
    }
  };

  return (
    <div className="search-results">
      {/* Search Header */}
      <section className="search-results__header">
        <div className="container">
          <h1 className="search-results__title">搜索结果</h1>
          <form className="search-results__form" onSubmit={handleSearch}>
            <div className="search-results__input-wrapper">
              <FiSearch className="search-results__input-icon" />
              <input
                type="text"
                className="search-results__input"
                placeholder="搜索产品、解决方案、新闻..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn--primary search-results__submit-btn">
                搜索
              </button>
            </div>
          </form>
          {hasSearched && !isLoading && (
            <p className="search-results__count">
              共找到 <strong>{results.length}</strong> 条与"
              <strong>{keyword}</strong>"相关的结果
            </p>
          )}
        </div>
      </section>

      {/* Results List */}
      <section className="search-results__content section">
        <div className="container">
          {isLoading ? (
            <div className="search-results__loading">
              <div className="search-results__spinner"></div>
              <p>正在搜索中...</p>
            </div>
          ) : !hasSearched ? (
            <div className="search-results__empty">
              <FiSearch className="search-results__empty-icon" />
              <h2 className="search-results__empty-title">请输入关键词搜索</h2>
              <p className="search-results__empty-text">
                您可以搜索产品名称、解决方案、公司新闻等相关内容
              </p>
              <div className="search-results__suggestions">
                <h3 className="search-results__suggestions-title">热门搜索</h3>
                <div className="search-results__suggestion-tags">
                  {['云计算', '大数据', '人工智能', '数字化转型', '企业安全'].map(
                    (tag) => (
                      <button
                        key={tag}
                        className="search-results__suggestion-tag"
                        onClick={() => {
                          setInputValue(tag);
                          setSearchParams({ keyword: tag });
                        }}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-results__empty">
              <FiSearch className="search-results__empty-icon" />
              <h2 className="search-results__empty-title">未找到相关结果</h2>
              <p className="search-results__empty-text">
                抱歉，没有找到与"<strong>{keyword}</strong>"相关的内容。
                <br />
                请尝试使用其他关键词搜索。
              </p>
              <div className="search-results__suggestions">
                <h3 className="search-results__suggestions-title">您可以尝试</h3>
                <ul className="search-results__tips">
                  <li>检查关键词是否有拼写错误</li>
                  <li>尝试使用更通用的关键词</li>
                  <li>减少关键词的数量</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="search-results__list">
              {results.map((result, index) => (
                <article key={result.id || index} className="search-results__item">
                  <div className="search-results__item-header">
                    <span
                      className="search-results__item-type"
                      style={{
                        backgroundColor: `${typeColors[result.type] || '#667eea'}15`,
                        color: typeColors[result.type] || '#667eea',
                      }}
                    >
                      {typeIcons[result.type] || typeIcons.default}{' '}
                      {typeLabels[result.type] || '其他'}
                    </span>
                    {result.date && (
                      <span className="search-results__item-date">
                        <FiClock /> {result.date}
                      </span>
                    )}
                  </div>
                  <h3 className="search-results__item-title">
                    <Link
                      to={result.link || '#'}
                      className="search-results__item-link"
                    >
                      {result.title}
                    </Link>
                  </h3>
                  <p className="search-results__item-summary">
                    {result.summary || result.description}
                  </p>
                  <Link
                    to={result.link || '#'}
                    className="search-results__item-more"
                  >
                    查看详情 <FiArrowRight />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

/* ============================================
   Mock Results (used when API is unavailable)
   ============================================ */

function getMockResults(query) {
  const allResults = [
    {
      id: 1,
      type: 'product',
      title: '弹性云服务器 ECS',
      summary: '提供安全可靠、弹性可伸缩的云计算服务。助您降低IT成本，提升运维效率。',
      link: '/products',
      date: '2024-12-15',
    },
    {
      id: 2,
      type: 'product',
      title: '云数据库 RDS',
      summary: '稳定可靠、可弹性伸缩的在线数据库服务，支持MySQL、PostgreSQL等主流数据库引擎。',
      link: '/products',
      date: '2024-12-10',
    },
    {
      id: 3,
      type: 'product',
      title: '大数据计算平台',
      summary: '面向海量数据处理的分布式计算平台，支持批处理和实时流计算。',
      link: '/products',
      date: '2024-11-20',
    },
    {
      id: 4,
      type: 'product',
      title: '机器学习平台',
      summary: '一站式AI开发平台，提供模型训练、部署、管理全生命周期服务。',
      link: '/products',
      date: '2024-11-15',
    },
    {
      id: 5,
      type: 'solution',
      title: '金融数字化转型方案',
      summary: '为银行、保险、证券等金融机构提供全方位的数字化转型方案。',
      link: '/solutions',
      date: '2024-12-01',
    },
    {
      id: 6,
      type: 'solution',
      title: '新零售解决方案',
      summary: '融合线上线下全渠道运营，通过数据驱动实现精准营销。',
      link: '/solutions',
      date: '2024-11-28',
    },
    {
      id: 7,
      type: 'solution',
      title: '智能制造方案',
      summary: '基于工业互联网平台，实现生产过程数字化、设备联网、智能排产和质量预测。',
      link: '/solutions',
      date: '2024-11-10',
    },
    {
      id: 8,
      type: 'news',
      title: '企业集团发布2024年度数字化转型白皮书',
      summary: '白皮书深入分析了全球数字化转型趋势，为企业提供了可落地的转型路径和实践指南。',
      link: '/about',
      date: '2024-12-15',
    },
    {
      id: 9,
      type: 'news',
      title: '荣获"年度最佳科技创新企业"殊荣',
      summary: '在第十五届全球科技峰会上，企业集团凭借卓越的技术创新能力获此殊荣。',
      link: '/about',
      date: '2024-12-05',
    },
    {
      id: 10,
      type: 'product',
      title: '企业安全中心',
      summary: '全方位的云上安全管理中心，提供威胁检测、漏洞扫描、合规审计等能力。',
      link: '/products',
      date: '2024-10-20',
    },
  ];

  const q = query.toLowerCase();
  return allResults.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q)
  );
}

export default SearchResults;
