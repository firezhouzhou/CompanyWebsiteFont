import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCloud,
  FiDatabase,
  FiCpu,
  FiShield,
  FiServer,
  FiGlobe,
  FiArrowRight,
  FiDownload,
  FiFileText,
} from 'react-icons/fi';
import './Products.css';

/* ============================================
   Mock Data
   ============================================ */

const categories = [
  { id: 'all', label: '全部' },
  { id: 'cloud', label: '云计算' },
  { id: 'data', label: '大数据' },
  { id: 'ai', label: '人工智能' },
  { id: 'security', label: '安全' },
  { id: 'iot', label: '物联网' },
];

const productsData = [
  {
    id: 1,
    title: '弹性云服务器 ECS',
    description: '提供安全可靠、弹性可伸缩的云计算服务。助您降低IT成本，提升运维效率。',
    category: 'cloud',
    icon: <FiCloud />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: '云数据库 RDS',
    description: '稳定可靠、可弹性伸缩的在线数据库服务，支持MySQL、PostgreSQL等主流数据库引擎。',
    category: 'cloud',
    icon: <FiServer />,
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  },
  {
    id: 3,
    title: '大数据计算平台',
    description: '面向海量数据处理的分布式计算平台，支持批处理和实时流计算。',
    category: 'data',
    icon: <FiDatabase />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 4,
    title: '数据可视化平台',
    description: '开箱即用的数据可视化工具，通过丰富的图表组件将数据转化为洞察力。',
    category: 'data',
    icon: <FiDatabase />,
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  },
  {
    id: 5,
    title: '机器学习平台',
    description: '一站式AI开发平台，提供模型训练、部署、管理全生命周期服务。',
    category: 'ai',
    icon: <FiCpu />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 6,
    title: '智能语音识别',
    description: '基于深度学习的语音识别服务，支持实时语音转写和离线识别。',
    category: 'ai',
    icon: <FiCpu />,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    id: 7,
    title: '企业安全中心',
    description: '全方位的云上安全管理中心，提供威胁检测、漏洞扫描、合规审计等能力。',
    category: 'security',
    icon: <FiShield />,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    id: 8,
    title: 'Web应用防火墙',
    description: '保护Web应用免受常见攻击，包括SQL注入、XSS跨站脚本等。',
    category: 'security',
    icon: <FiShield />,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  },
  {
    id: 9,
    title: '物联网平台',
    description: '连接万物的物联网开发平台，支持设备接入、数据采集、规则引擎等功能。',
    category: 'iot',
    icon: <FiGlobe />,
    gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  },
];

const caseStudies = [
  {
    id: 1,
    company: '某大型银行',
    title: '核心系统云化迁移',
    description: '帮助该银行将核心业务系统迁移上云，实现99.99%的系统可用性。',
    result: '系统可用性提升至99.99%，运维成本降低40%',
  },
  {
    id: 2,
    company: '某知名电商平台',
    title: '大促弹性扩容方案',
    description: '为电商平台提供大促期间的弹性扩容方案，轻松应对百倍流量高峰。',
    result: '成功支撑10倍以上的流量洪峰，零故障运行',
  },
  {
    id: 3,
    company: '某制造业集团',
    title: '智能工厂建设',
    description: '基于物联网和AI技术构建智能工厂，实现生产过程的数字化和智能化。',
    result: '生产效率提升30%，良品率提升至99.5%',
  },
];

const downloads = [
  { id: 1, name: '产品白皮书 - 云计算篇', type: 'PDF', size: '5.2 MB' },
  { id: 2, name: '产品白皮书 - 大数据篇', type: 'PDF', size: '4.8 MB' },
  { id: 3, name: '产品白皮书 - 人工智能篇', type: 'PDF', size: '6.1 MB' },
  { id: 4, name: '技术架构手册', type: 'PDF', size: '8.3 MB' },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts =
    activeCategory === 'all'
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <div className="products">
      {/* Hero Banner */}
      <section className="products__hero">
        <div className="container">
          <h1 className="products__hero-title">产品与服务</h1>
          <p className="products__hero-subtitle">
            全方位的数字化产品矩阵，为企业提供从基础设施到智能应用的一站式解决方案
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="products__filter section">
        <div className="container">
          <div className="products__tabs" role="tablist" aria-label="产品分类">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`products__tab ${activeCategory === cat.id ? 'products__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products__grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="products__card">
                <div
                  className="products__card-icon"
                  style={{ background: product.gradient }}
                >
                  {product.icon}
                </div>
                <h3 className="products__card-title">{product.title}</h3>
                <p className="products__card-desc">{product.description}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="products__card-link"
                >
                  了解更多 <FiArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Client Case Studies */}
      <section className="products__cases section section--gray">
        <div className="container">
          <h2 className="section__title">客户案例</h2>
          <p className="section__subtitle">
            真实的客户成功案例，展示我们的产品如何帮助企业实现业务价值
          </p>
          <div className="products__cases-grid">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="products__case-card">
                <span className="products__case-company">{cs.company}</span>
                <h3 className="products__case-title">{cs.title}</h3>
                <p className="products__case-desc">{cs.description}</p>
                <div className="products__case-result">
                  <span className="products__case-result-label">成果：</span>
                  {cs.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Center */}
      <section className="products__downloads section">
        <div className="container">
          <h2 className="section__title">下载中心</h2>
          <p className="section__subtitle">获取产品文档和技术资料</p>
          <div className="products__downloads-list">
            {downloads.map((dl) => (
              <div key={dl.id} className="products__download-item">
                <div className="products__download-info">
                  <FiFileText className="products__download-icon" />
                  <div>
                    <h4 className="products__download-name">{dl.name}</h4>
                    <span className="products__download-meta">
                      {dl.type} · {dl.size}
                    </span>
                  </div>
                </div>
                <button className="btn btn--outline products__download-btn">
                  <FiDownload /> 下载
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
