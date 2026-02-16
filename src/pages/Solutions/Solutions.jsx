import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiDollarSign,
  FiShoppingCart,
  FiSettings,
  FiHeart,
  FiTruck,
  FiHome,
  FiArrowRight,
} from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import './Solutions.css';

/* ============================================
   Mock Data
   ============================================ */

const industries = [
  { id: 'all', label: '全部行业' },
  { id: 'finance', label: '金融' },
  { id: 'retail', label: '零售' },
  { id: 'manufacturing', label: '制造' },
  { id: 'healthcare', label: '医疗' },
  { id: 'logistics', label: '物流' },
  { id: 'realestate', label: '地产' },
];

const solutionsData = [
  {
    id: 1,
    title: '金融数字化转型方案',
    description: '为银行、保险、证券等金融机构提供全方位的数字化转型方案，包括核心系统上云、智能风控、数字营销等。',
    industry: 'finance',
    icon: <FiDollarSign />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['核心系统上云', '智能风控', '数字化营销', '移动金融'],
  },
  {
    id: 2,
    title: '新零售解决方案',
    description: '融合线上线下全渠道运营，通过数据驱动实现精准营销，提升客户体验和运营效率。',
    industry: 'retail',
    icon: <FiShoppingCart />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    features: ['全渠道运营', '精准营销', '智能供应链', '会员管理'],
  },
  {
    id: 3,
    title: '智能制造方案',
    description: '基于工业互联网平台，实现生产过程数字化、设备联网、智能排产和质量预测。',
    industry: 'manufacturing',
    icon: <FiSettings />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    features: ['设备联网', '智能排产', '质量预测', '能耗优化'],
  },
  {
    id: 4,
    title: '智慧医疗方案',
    description: '构建数字化医疗服务平台，实现电子病历、远程诊疗、智能导诊等功能。',
    industry: 'healthcare',
    icon: <FiHeart />,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    features: ['电子病历', '远程诊疗', '智能导诊', '健康管理'],
  },
  {
    id: 5,
    title: '智慧物流方案',
    description: '提供从仓储管理到配送追踪的全链路物流数字化方案，降低物流成本。',
    industry: 'logistics',
    icon: <FiTruck />,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    features: ['仓储管理', '路径优化', '配送追踪', '供应链可视化'],
  },
  {
    id: 6,
    title: '智慧地产方案',
    description: '打造数字化社区和智慧物业管理平台，提升居住体验和物业管理效率。',
    industry: 'realestate',
    icon: <FiHome />,
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    features: ['智慧社区', '物业管理', '能源管理', '安防监控'],
  },
];

const processSteps = [
  { step: 1, title: '需求调研', desc: '深入了解业务场景和需求痛点' },
  { step: 2, title: '方案设计', desc: '制定针对性的解决方案架构' },
  { step: 3, title: '技术实施', desc: '专业团队高效交付和部署' },
  { step: 4, title: '持续优化', desc: '长期陪伴式运营和迭代升级' },
];

const testimonials = [
  {
    id: 1,
    content: '企业集团的金融数字化方案帮助我们成功完成了核心系统迁移，系统稳定性显著提升，客户满意度大幅提高。',
    author: '张总',
    title: '某大型银行 · CTO',
    company: '某大型银行',
  },
  {
    id: 2,
    content: '通过智能制造方案的实施，我们的生产效率提升了30%，产品良率达到了行业领先水平。',
    author: '李总',
    title: '某制造集团 · 副总裁',
    company: '某制造集团',
  },
  {
    id: 3,
    content: '新零售解决方案让我们实现了线上线下的全面打通，会员复购率提升了45%，远超预期效果。',
    author: '王总',
    title: '某零售企业 · CEO',
    company: '某零售企业',
  },
];

const Solutions = () => {
  const [activeIndustry, setActiveIndustry] = useState('all');

  const filteredSolutions =
    activeIndustry === 'all'
      ? solutionsData
      : solutionsData.filter((s) => s.industry === activeIndustry);

  return (
    <div className="solutions">
      {/* Hero Banner */}
      <section className="solutions__hero">
        <div className="container">
          <h1 className="solutions__hero-title">解决方案</h1>
          <p className="solutions__hero-subtitle">
            深耕行业场景，提供端到端的数字化解决方案，助力各行业实现智能化升级
          </p>
        </div>
      </section>

      {/* Industry Filter & Solutions */}
      <section className="solutions__main section">
        <div className="container">
          <div className="solutions__tabs" role="tablist" aria-label="行业分类">
            {industries.map((ind) => (
              <button
                key={ind.id}
                className={`solutions__tab ${activeIndustry === ind.id ? 'solutions__tab--active' : ''}`}
                onClick={() => setActiveIndustry(ind.id)}
                role="tab"
                aria-selected={activeIndustry === ind.id}
              >
                {ind.label}
              </button>
            ))}
          </div>

          <div className="solutions__grid">
            {filteredSolutions.map((solution) => (
              <article key={solution.id} className="solutions__card">
                <div className="solutions__card-header">
                  <div
                    className="solutions__card-icon"
                    style={{ background: solution.gradient }}
                  >
                    {solution.icon}
                  </div>
                  <h3 className="solutions__card-title">{solution.title}</h3>
                </div>
                <p className="solutions__card-desc">{solution.description}</p>
                <div className="solutions__card-features">
                  {solution.features.map((feat, idx) => (
                    <span key={idx} className="solutions__card-feature">
                      {feat}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/solutions/${solution.id}`}
                  className="solutions__card-link"
                >
                  了解详情 <FiArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flowchart */}
      <section className="solutions__process section section--gray">
        <div className="container">
          <h2 className="section__title">服务流程</h2>
          <p className="section__subtitle">
            专业规范的项目交付流程，确保方案高效落地
          </p>
          <div className="solutions__process-steps">
            {processSteps.map((step, index) => (
              <React.Fragment key={step.step}>
                <div className="solutions__process-step">
                  <div className="solutions__process-number">{step.step}</div>
                  <h4 className="solutions__process-title">{step.title}</h4>
                  <p className="solutions__process-desc">{step.desc}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="solutions__process-connector">
                    <FiArrowRight />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="solutions__testimonials section">
        <div className="container">
          <h2 className="section__title">客户评价</h2>
          <p className="section__subtitle">
            听听我们客户的真实反馈
          </p>
          <div className="solutions__testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="solutions__testimonial-card">
                <FaQuoteLeft className="solutions__testimonial-quote" />
                <p className="solutions__testimonial-content">{t.content}</p>
                <div className="solutions__testimonial-author">
                  <div className="solutions__testimonial-avatar">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="solutions__testimonial-name">{t.author}</div>
                    <div className="solutions__testimonial-title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
