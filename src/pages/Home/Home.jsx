import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiCloud,
  FiDatabase,
  FiCpu,
  FiShield,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import Carousel from '../../components/Carousel/Carousel';
import Statistics from '../../components/Statistics/Statistics';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import NewsCard from '../../components/NewsCard/NewsCard';
import './Home.css';

/* ============================================
   Mock Data
   ============================================ */

const products = [
  {
    id: 1,
    icon: <FiCloud />,
    title: '云计算平台',
    description: '弹性可扩展的云计算基础设施，支持企业级应用的高效部署与管理。',
    link: '/products',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    icon: <FiDatabase />,
    title: '大数据分析',
    description: '实时数据处理与智能分析平台，帮助企业从海量数据中挖掘商业价值。',
    link: '/products',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    icon: <FiCpu />,
    title: '人工智能',
    description: '领先的AI技术赋能企业智能化升级，涵盖视觉、语音、NLP等核心能力。',
    link: '/products',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    icon: <FiShield />,
    title: '企业安全',
    description: '全方位的安全防护体系，保障企业数据安全与业务连续性。',
    link: '/products',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
];

const newsData = [
  {
    id: 1,
    title: '企业集团发布2024年度数字化转型白皮书',
    summary: '白皮书深入分析了全球数字化转型趋势，为企业提供了可落地的转型路径和实践指南。',
    date: '2024-12-15',
    category: '公司新闻',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    link: '#',
  },
  {
    id: 2,
    title: '携手合作伙伴共建产业生态，推进行业数字化进程',
    summary: '与全球领先科技企业达成战略合作协议，共同构建开放包容的产业数字化生态体系。',
    date: '2024-12-10',
    category: '行业动态',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    link: '#',
  },
  {
    id: 3,
    title: '荣获"年度最佳科技创新企业"殊荣',
    summary: '在第十五届全球科技峰会上，企业集团凭借卓越的技术创新能力获此殊荣。',
    date: '2024-12-05',
    category: '荣誉奖项',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    link: '#',
  },
];

const partners = [
  '合作伙伴 A',
  '合作伙伴 B',
  '合作伙伴 C',
  '合作伙伴 D',
  '合作伙伴 E',
  '合作伙伴 F',
  '合作伙伴 G',
  '合作伙伴 H',
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Carousel */}
      <section className="home__hero">
        <Carousel />
      </section>

      {/* Company Introduction */}
      <section className="home__intro section">
        <div className="container">
          <div className="home__intro-content">
            <div className="home__intro-text">
              <h2 className="home__intro-title">
                以科技创新<span className="home__intro-highlight">驱动数字化未来</span>
              </h2>
              <p className="home__intro-description">
                企业集团成立于2005年，是一家领先的数字化解决方案提供商。我们致力于通过云计算、
                大数据、人工智能等前沿技术，帮助全球企业客户实现数字化转型升级，
                构建面向未来的核心竞争力。
              </p>
              <ul className="home__intro-features">
                <li className="home__intro-feature">
                  <FiCheckCircle className="home__intro-feature-icon" />
                  <span>全球50+国家和地区业务覆盖</span>
                </li>
                <li className="home__intro-feature">
                  <FiCheckCircle className="home__intro-feature-icon" />
                  <span>服务超过10,000家企业客户</span>
                </li>
                <li className="home__intro-feature">
                  <FiCheckCircle className="home__intro-feature-icon" />
                  <span>拥有5,000+项技术专利</span>
                </li>
              </ul>
              <Link to="/about" className="btn btn--primary">
                了解更多 <FiArrowRight />
              </Link>
            </div>
            <div className="home__intro-visual">
              <div className="home__intro-card home__intro-card--1">
                <div className="home__intro-card-icon">
                  <FiCloud />
                </div>
                <span>云原生</span>
              </div>
              <div className="home__intro-card home__intro-card--2">
                <div className="home__intro-card-icon">
                  <FiCpu />
                </div>
                <span>智能化</span>
              </div>
              <div className="home__intro-card home__intro-card--3">
                <div className="home__intro-card-icon">
                  <FiShield />
                </div>
                <span>安全可靠</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="home__statistics">
        <Statistics />
      </section>

      {/* Products/Services Highlights */}
      <section className="home__products section section--gray">
        <div className="container">
          <h2 className="section__title">核心产品与服务</h2>
          <p className="section__subtitle">
            为企业提供全方位的数字化产品与解决方案，助力业务创新与增长
          </p>
          <div className="home__products-grid">
            {products.map((product) => (
              <div key={product.id} className="home__product-card">
                <div
                  className="home__product-icon"
                  style={{ background: product.gradient }}
                >
                  {product.icon}
                </div>
                <h3 className="home__product-title">{product.title}</h3>
                <p className="home__product-desc">{product.description}</p>
                <Link to={product.link} className="home__product-link">
                  了解更多 <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="home__video section">
        <div className="container">
          <h2 className="section__title">企业宣传</h2>
          <p className="section__subtitle">
            了解我们的愿景、使命和发展历程
          </p>
          <VideoPlayer
            title="探索企业数字化未来"
            description="了解我们如何通过技术创新帮助企业实现数字化转型，提升业务效率与竞争力。"
          />
        </div>
      </section>

      {/* Latest News */}
      <section className="home__news section section--gray">
        <div className="container">
          <h2 className="section__title">最新动态</h2>
          <p className="section__subtitle">
            了解企业集团的最新资讯与行业动态
          </p>
          <div className="home__news-grid">
            {newsData.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                summary={news.summary}
                date={news.date}
                category={news.category}
                gradient={news.gradient}
                link={news.link}
              />
            ))}
          </div>
          <div className="home__news-more">
            <Link to="/about" className="btn btn--outline">
              查看全部新闻 <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="home__partners section">
        <div className="container">
          <h2 className="section__title">合作伙伴</h2>
          <p className="section__subtitle">
            与全球领先企业携手共进，构建数字化生态
          </p>
          <div className="home__partners-grid">
            {partners.map((partner, index) => (
              <div key={index} className="home__partner-item">
                <div className="home__partner-logo">
                  {partner.charAt(partner.length - 1)}
                </div>
                <span className="home__partner-name">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
